---
layout: default
author: Kele Heart
---
# Building a TinyUrl clone

I recently built out a url shortener that was meant to serve as a test of my technical sophistication. I wanted to see if I could build out a service I've seen before, but never took the time to understand how it worked. 

---

## How does it work?

The concept is really simple. All we have to do is create a form that takes the input from the user, some really long url that's ugly and they want to be shortened. We then create a random string to associate with the url, and store them both in a database. Then, create a dynamic route that will take the url path, being our random string we just generated, and using it to look up the original, longer url, in the database entry. Finally, do a 301 redirect to the original url and presto! The url shortening service is born.

### The HTML/JS

The page we need is relatively simple. You can view it below and then I'll explain it.

```
<main>
  <h1>Yintii</h1>
  <span>Shorten your link</span>
  <%= form_tag(short_link_home_path, method: :post) do %>
    <%= text_field_tag :link, params[:link] %>
    <%= submit_tag "Shorten" %>
  <% end %>
  
  <% if @short_link %>
    <div id="short-link-wrap">
      <p>http://yintii.com/<%= @short_link %></p>
      <button onclick="copyLink()">
        <%= fa_icon "copy" %>
      </button>
    </div>
  <% end %>
</main>

<script>
  function copyLink() {
    let copyText = document
                    .getElementById("short-link-wrap")
                    .textContent;
    
    let tempInput = document.createElement("input");
    tempInput.value = copyText;
    
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
</script>
```

Very simply we have a headline with a span, and a form that is being generated in a rails way and some embedded ruby. Then we have more embedded ruby checking if there is a short_link, and if there is, it shows the shortlink with a convienent copy button. The script tags just hold the JavaScript for the click-copy function. Combined with a little css, you get the page you see [here](https://yintii.com/).

### The Controller

The controller will be simple. We'll have a home action that will simply check if the incoming request is a post request or a get request. This will all be handled on the front page of our website, as we really only need the one page. 

```
class ShortLinksController < ApplicationController
  def home
    #if the user has submitted a link
    #generate a random hex and save it to the database
    if request.post?

      if params[:link] == ""
        redirect_to root_path
        flash[:error] = "You must enter a link to shorten"
      end

      @short_link = SecureRandom.hex(3)
      
      @db_entry = ShortLink.new(
        original_link: params[:link], 
        short_link: @short_link
      )

      if @db_entry.valid?
        begin
          @db_entry.save
          ActiveRecord::Base.connection.close
        rescue ActiveRecord::RecordNotUnique => e
          #if the random hex is not unique, 
          #generate a new one and try again
          @short_link = SecureRandom.hex(3)
          @db_entry.short_link = @short_link
          retry
        end
      end
    end #end if request.post?

    if request.get?
      #if the user has entered a shortened link
      #redirect them to the original link
      if params[:short_link]
        #try catch block to catch any errors
        #that may occur when searching the database
        begin
          @db_entry = ShortLink.find_by(
            short_link: params[:short_link]
          )
          ActiveRecord::Base.connection.close
          redirect_to (
            @db_entry.original_link, 
            status: 301, 
            allow_other_host: true
          )
        rescue ActiveRecord::RecordNotFound => e
          #if the random hex is not found, 
          #redirect to the home page and display an error
          redirect_to root_path
          flash[:error] = "The link you entered does not exist"
        end
      end
    end #end if request.get?

  end #end home
end
```

The first part is our check for post. We first check if it's a blank submission. If it is, we redirect them back to the home page with an error flash message that will appear.

If it isn't blank then we generate a random 5 character string to serve as our short code in our link.

We create a entry with the original link and the new short code. If it's valid, we'll try to save it, then close the connection. If the short code happens to all ready be used for a shortlink, we'll regenerate that short code and attempt to save the entry again until it saves. 

The second part is the get request that handles redirecting the user to the proper link per their shortlink code. 

We check if there is a short code at all, if not, it's just a regular page visit. If there is a short code then we have a short link. 

Then we try to find a link using the shortlink's code as the value to search by. Once it finds it, we redirect to the original link. If not, then it redirects us to the home page and tells us the shortlink is invalid. 

### Routes

The routes were simple, just a dynamic get and a post to handle submissions:

```
Rails.application.routes.draw do  
  root "short_links#home"
  post "/", to: 'short_links#home', as: 'short_link_home' 
  get '/:short_link', to: 'short_links#home', as: 'short_link_redirect'
end

```

# That's it!

This was a fun a really simple project I've revised to be cleaner. 