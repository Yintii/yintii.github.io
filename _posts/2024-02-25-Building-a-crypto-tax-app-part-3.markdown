---
layout: post
title: Building a Crypto Tax App Part 3
---

There has be a HUGE amount of progress on this project! 

I have made big steps towards a finished product. The MVP is now looking closer to a version 1.0. I worked through the design
a bit with Mike over the weeks and got a general feel for something simple, just to give it some life. The plain white website 
was just boring to look at. 

Working through the project as well, we eventually had to get a domain name so we could continue developing. There was a need to
make POST 'delete' requests and it required both ends be encrypted with SSL. So we had to decide on a name. We spoke for a bit 
coming up with all kinds of different names tax related. 

Nothing was terribly compelling however, until I thought of the one I'm currently using now.

Taxolotl

A tax, axolotl.

I thought it was perfect, with so much brand potential. We can have a little axolotl mascot, he wears a little suit and has glasses,
says stuff like, "everything is tax deductable!" and cute stuff like that. Borrowing the visual brand equity of Geico, kinda. 

I was stoked to come up with it. It wasn't available as a .com, so I got the .xyz for it. 

[https://taxolotl.xyz](https://taxolotl.xyz)

The app itself does require the use of a MetaMask wallet or something similar, so I will provide screenshots in this writing as well.

![Landing Page of Taxolotl](/assets/images/taxolotl-img-1.png)

Right now the home page is a little more than an aesthetic landing page. The video will be replaced with a full 'how it works' video,
the mission content will be updated, a footer still really needs to be made, but everything works.

The accounts page leaves a lot to be desired right now. This is something I will develop further after I have all the chains
I want to integrate into the app complete. I want to do things like chart withholding over time, show the amounts of wallets and recent transactions,
lots of 'quick glance' things that make a dashboard nice. 

![Accounts Page](/assets/images/taxolotl-img-2.png)

Moving on to the wallets page, it's pretty bare at first, but then you add your wallets!

Currently when you go to make a wallet, you're forced to first provide your 'withholding' wallet. Since all the integrated chains are EVM compatible, 
you only need 1 withholding wallet right now. As we develop to include other blockchains we will need to create flows for multiple withholding wallets.

Next, you can make any other wallet of the available chains. We are currently supporting Ethereum and Polygon, and you might see there's Optimism, Arbitrum,
and Base on the select menu as well. They are currently implemented in the front end, however they are not working on the monitoring server. For whatever reason,
they do not support the same web3 ethers functions that Ethereum Base Layer and Polygon do. It will require just a bit more time and research to get them working.

Before we get there though, we do have to make the wallet.

![Create Wallet Page](/assets/images/taxolotl-img-3.png)

Simply fill in the details, and select a chain and percentage. This is the percentage the app will send to your withholding wallet for you.
When the wallet is succesfully created, you'll be taken to it's specific page where the wallets pending withholding transactions will appear.

![Single Wallet Page](/assets/images/taxolotl-img-4.png)

Then when you've added a lot you'll see them populate the wallets page like so

![All the wallets](/assets/images/taxolotl-img-5.png)
