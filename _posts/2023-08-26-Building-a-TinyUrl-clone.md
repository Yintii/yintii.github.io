---
layout: default
author: Kele Heart
---
# Building a TinyUrl clone

I recently built out a url shortener that was meant to serve as a test of my technical sophistication. I wanted to see if I could build out a service I've seen before, but never took the time to understand how it worked. The concept was relatively simple once I looked into it, and I realized it would be an easy and fun project to work on.

I've also recently learned to love Ruby on Rails. This project was really a wake up call to how quickly you can bring an idea to conception when you choose the right tools. I love JavaScript, and I know I'm insane for saying that, but I really do. However, if I had to pick between configuring a mongoDB set up, an express server, and my react site, I'd have to say it's much less work to just do it in Rails.

I thought Rails was this crazy shortcut for developers a few years ago, but it's not. You have to understand the problem rails solves, and the concepts that it encompasses. It's a comprehensive solution for building web applications, but if you don't comprehend the context of what you're doing, you'd have a easier time herding cats than building anything with it. 

Fundamental understanding of your tools and how to use them, when and why to chose what tool or service is paramount to being able to develop anything. 

**This isn't going to be a tutorial, but more of a high level overlook of the project and the parts that make it work.**

---

## How does it work?

The concept is really simple. All we have to do is create a form that takes the input from the user, some really long url that's ugly and they want to be shortened. We then create a random string to associate with the url, and store them both in a database. Then, create a dynamic route that will take the url path, being our random string we just generated, and using it to look up the original, longer url, in the database entry. Finally, do a 301 redirect to the original url and presto! The url shortening service is born.

### The Markup

The page we need is relatively simple. You can view it below and then I'll explain it.

    <main>
      <h1>Yintii</h1>
      <span>Shorten your link</span>
      <%= form_tag(static_pages_home_path, method: :post) do %>
        <%= text_field_tag :link, params[:link] %>
        <%= submit_tag "Shorten" %>
      <% end %>
      
      <% if @short_link %>
        <div id="short-link-wrap">
              <p>https://shorty.com/<%= @short_link %></p>
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

Very simply we have a headline with a span, and a form that is being generated in a rails way and some embedded ruby. Then we have more embedded ruby checking if there is a short_link, and if there is, it shows the shortlink with a convienent copy button. The script tags just hold the JavaScript for the click-copy function. Combined with a little css, you get the page you see [here](https://protected-bayou-67177-def7fae57e65.herokuapp.com/).

### The Contollers

Next, we have to handle that input coming in from our form we created. 

First, we need to handle post requests to the same page that the form is on. In rails we'll do this in our StaticPages controller.

*static_pages_controller.rb*

    ...
    def Home
      #on post request, take the data from the form and save it to the database
      #with an new, asscoiated, shortened link 
      #that the given link will 301 redirect to
      if request.post?
        @short_link = SecureRandom.hex(3)

        #the shortened link model is used to store 
        #the shortened link and the original link
        @db_entry = ShortLink.new(
                original_link: params[:link], 
                short_link: @short_link
                )

        #if the data is valid, save it to the database
        if @db_entry.valid?
          @db_entry.save
        end
      end
    end
    ...

All this is doing is making our random string with `SecureRandom.hex(3)` and then saving the it and the given url to our database.

Of course, we need another controller for the dynamic route that we will use to process the random strings in our shortened urls. This is also very straight forward as you can see below

*short_links_controller.rb*

    ...
    def redirect
      short_link = ShortLink.find_by(short_link: params[:short_link])
      if short_link
        redirect_to short_link.original_link, status: 301, allow_other_host: true
      else
        redirect_to root_path, alert: "Short link not found", status: 404
      end
    end
    ...

This is parsing the end of the url for the random string and then using it in a find_by look up. If it does exist, then the shortlink's associated url is used to redirect the user to the long url. In rails, we define our dynamic route in the config/routes.rb file as so 

`get '/:short_link', to: 'short_links#redirect', as: 'short_link_redirect'`

Surprisingly, we're done! This is all it takes to create a url shortener. The users can now visit the site, submit a long url, get back a shortened url, and provide that to anyone they'd like. Once their friend or collegue decide to open it, all they have to do is click on the link. It will take them to our dynamic route we've defined, run the code in our redirect function, and use the resulting url in a 301 redirect, completing the use of the service.
