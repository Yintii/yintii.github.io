---
layout: post
title: Building a visual display calculator
---

![Visualization Tool](/assets/images/visualizer-img-1.png)

My latest and greatest achievement was a feat of React. This really pushed me to understand React completely. 
There's a lot that can be missed when learning about a library or framework, and only practical experience seems
to teach you the practical parts. 

The project in question was a client request for a visualization tool, or "calculator". They sell modular panels that when assembled,
form large displays. There's many types of modules, and some that have very specific rules on it's ability to tile.

Some modules can only tile horizontally, some can tile with different variants of itself, and many other caveats that 
needed to be addressed. 

To get a better understanding of what is written here, it will help if you play with the app yourself. Click [here]('https://yintii-example.vercel.app/') to view the app.

There are 4 available input fields here. The "wall" dimensions are for a fixed wall. These inputs are optional. Think of this as any big wall a customer might want to cover, be it for sports games, advertising, whathaveyous.
Then there's the "display" dimensions. This is a requested size for your display you want to make. Do you want a 10 foot by 10 foot wall? Enter it in! However you won't see anything yet. 

This is because you then have to choose a variant of their display modules.
They have outdoor, and indoor modules. Once you've chosen a variation of the 
module you'd like, you will see the visualizer come to life for your display 
you want to make.  

![Visualizer data output](/assets/images/visualizer-img-2.png)

The top bar becomes populated by all the available information to calulate about the chosen options. 
You get a nice glance at the module you're viewing, it's pixel density, the displays approximate 
width and height (descrepancies are within .25 of and inch),the resolution, and finally the amount 
of modules needed to cover the area.

You will also notice after selecting a module variant, you will be presented with new options.
These are common presets customers look for when shopping for modular displays such as these.

![Indoor Options](/assets/images/visualizer-img-3.png){: style="float: left"}

Here we see the indoor presets. The outdoor presets are in standard resolution, and then common billboard layouts.

This has empowered the sales team to generate realistic estamations and provide a sleek visual experience to go with it.
A tool like this allows people to order with confidence, and even decide what they want and need before ever reaching a sales person.

Earlier I also mentioned that the fixed wall was an optional thing. This is true but there's a great feature to highlight
surronding the fixed wall integration.

This came as an after thought, mid project. The client was wanting to provide a way of showing what the display would look like on their own wall. 

It seemed to be a moot point, but brought up new challenges. Limiting scaling when there's a fixed wall, rescaling if
the fixed wall dimensions are removed by the user. Giving some kind of indication that the display requested would be 
too big for the fixed wall. So on. 

However, it needed to be done. An inevitable part of the development process is integrating after thoughts sometimes. 

So if you have a wall that is 10x10 and you request a 12x12 display, you should see a new effect.

![Too big image](/assets/images/visualizer-img-4.png)

Notice also how the 11x11 display won't show that there's an issue. That's because we're only *requesting*
a display of a 11x11 dimensions. However, you're not always able to get it perfectly because of the modules 
themselves all being different dimensions. 

This was a project that took a lot of effort and communication with the client. Ultimately, I am happy with how it came out.
I would love to see this one through further and possibly create a backend for the application that can allow for the client
to add new modules or adjust the values of existing ones as needed. The ability to deprecate old modules, and so on.

Code for this project can be viewed [here](https://github.com/Yintii/DisplayTool).
