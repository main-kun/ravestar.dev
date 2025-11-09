---
title: "The Anatomy of Node: The Loop and Async I/O"
description: "Building an event loop from scratch: handling async I/O, understanding the task queue, and moving closer to a real runtime."
date: 2025-04-06
---

Previously on "The Anatomy of Node" we have found out that we can, in fact, compile V8 and we have started our own little runtime. We ran a few simple scripts and quickly found out that we are missing a way to run asynchronous operations.

Naturally, implementing an event loop is the next step for us. But first, before we get our hands dirty, I'd like to consider the problem at hand from first principles. Let's find out why we need the event loop before we start building it.

## Why are we here?

Consider a server in abstract: a machine connected to the internet with an OS running on it. We'd like the machine to do something useful. Say render a blog. Fetch blog posts from a database, render html from them. Fairly simple.

So what's the simplest way we could do it? Well, the simplest approach would be listening on a socket and rendering html as soon as anyone connects. Conceptually it's as simple as it gets. But the issue here is that we can only handle a single user at a time. While we're rendering HTML for a single connection, the other connections sit in a queue and wait for their turn. If we take too long - connections time out on the client. If connection queue fills up on the server - we start dropping new connections. This is clearly not the way to run anything in production.

Well we can use threads for parallelism. Once we accept new connection we can give it it's own thread for handling the request. We can handle way more connections that way. 