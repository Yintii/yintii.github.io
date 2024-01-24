---
layout: post
title: Creating a URL shortener
---

Recently I wanted to recreate a popular service we're all familiar with, the basic url shortener. I wasn't really sure how to do it off-the-bat, but after a little bit of analysis and thinking the concept became clear. Doing this would be fairly simple but would require a database and a dynamic route.

If you would like to see the finished product, you can view the shortener [here](https://yintii.com/).

All we're looking to do in practice is create a service that accepts a url, then creates what I like to call a 'shortcode' for another. This is just a random alphanumeric string that works as a key to the originally submitted url value. This is then given back to the user in the form of the new, shortened url, 'yintii.com/123abc'.

When providing the url to a new user, such as in a Tweet or other short form content, it will work just the same as providing the original. This is done with a dynamic route that handles 301 redirects. The project is done with Ruby on Rails, and the routes are as follows:

{% highlight ruby %}
Rails.application.routes.draw do  
  root "short_links#home"
  post "/", to: 'short_links#home', as: 'short_link_home' 
  get '/:short_link', to: 'short_links#home', as: 'short_link_redirect'
end
{% endhighlight %}

We don't really need any other page besides the home page. The dynamic route is really just to process the short link provided, grabbing the code, and doing a database look up for the associated url.

{% highlight ruby %}
class ShortLinksController < ApplicationController
  def home
    #if the user has submitted a link, generate a random hex and save it to the database
    if request.post?

      if params[:link] == ""
        redirect_to root_path
        flash[:error] = "You must enter a link to shorten"
      end

      @short_link = SecureRandom.hex(3)
      
      @db_entry = ShortLink.new(original_link: params[:link], short_link: @short_link)

      if @db_entry.valid?
        begin
          @db_entry.save
          ActiveRecord::Base.connection.close
        rescue ActiveRecord::RecordNotUnique => e
          #if the random hex is not unique, generate a new one and try again
          @short_link = SecureRandom.hex(3)
          @db_entry.short_link = @short_link
          retry
        end
      end
    end #end if request.post?

    if request.get?
      #if the user has entered a shortened link, redirect them to the original link
      if params[:short_link]
        #try catch block to catch any errors that may occur when searching the database
        begin
          @db_entry = ShortLink.find_by(short_link: params[:short_link])
          ActiveRecord::Base.connection.close
          redirect_to @db_entry.original_link, status: 301, allow_other_host: true
        rescue ActiveRecord::RecordNotFound => e
          #if the random hex is not found, redirect to the home page and display an error
          redirect_to root_path
          flash[:error] = "The link you entered does not exist"
        end
      end
    end #end if request.get?

  end #end home
end
{% endhighlight %}

We use the home page as a universal page for all the logic, just dividing it into whether or not the incoming request was POST or GET.

We first check that the link parameter isn't blank, if it is, then it just redirects back to the root route and flashes an error message.

Next, we generate the shortcode for the new link. We then prepare the database entry with all of the data including the new shortcode.

"If" the entry is valid, it gets written to the database successfully and we can proceed as such. However, if we find that the shortcode written isn't unique, we redo the process after regenerating a new shortcode.

Now in the event we get a regular get request, we have to first check if it's a request to the main page, or a shortlink.

If it's a shortlink, we use that information to look up the original url in the database, and then we handle the 301 redirect to said url.

If it cannot be found, we just redirect to the home page instead and then flash an error message.

Paired with this little bit of front end code:

{% highlight erb %}
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
    let copyText = document.getElementById("short-link-wrap").textContent;
    
    let tempInput = document.createElement("input");
    tempInput.value = copyText;
    
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
</script>
{% endhighlight %}

You get the website [you see here](https://yintii.com/). (Minus the css.)

A relatively simple concept that was fun to rebuild. I needed to do something with this domain and was just glad to find something fun for it. 😊
