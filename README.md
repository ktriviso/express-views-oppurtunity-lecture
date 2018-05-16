# Express Views 👀

### Learning Objectives
- Describe the concept of "templating" at a high level
- Create templates and render views in an Express application
- Apply EJS syntax to insert data into HTML
- Render partials and iterate over data in views
- Differentiate between `res.send`, `res.render`, and `res.redirect`
- Analyze pages to spot what elements could be abstracted into partials

# What _is_ a view, anyway?

**The term "view" in the context of a full-stack application refers to what a visitor to the site sees when the page loads.** Views are how the information in the database -- the model -- is represented in the browser.

### View engines (a.k.a templating engines)

We're probably all familiar with the term "template" -- a document that already has some details in place, but needs to have the rest of them filled in. **Templating engines** in JavaScript allow us to fill in the blanks in our HTML with JavaScript without having to do a ton of string concatenation or DOM manipulation (😖).

For example, consider the following two blocks of code, which have more or less the same end result:

```js
// adding a paragraph with DOM methods
const myName = 'Kate';
const myDiv = document.querySelector('#mydiv');
const newParagraph = document.createElement('p');
newParagraph.innerHTML = `Hello, my name is ${myName}.`;
const newLink = document.createElement('a');
newLink.setAttribute('href', `/${myName}`);
newLink.innerHTML = 'Learn more!';
newParagraph.appendChild(newLink);
myDiv.appendChild(newParagraph);
```

```js
// adding a paragraph with string concatenation
const myName = 'Kate';
const myDiv = document.querySelector('#myDiv');
let nameParagraph = '<p>';
nameParagraph +=       `Hello, my name is ${myName}.`;
nameParagraph +=       `<a href='/${myName}'>Learn More</a>`;
nameParagraph +=    '</p>';
myDiv.innerHTML = nameParagraph;
```

Neither of these are particularly fun. The first is tedious, and the second -- while looking like HTML, more or less -- just feels bad. Having a Node backend gives us the ability to use a templating engine, which is one solution to this problem.

## We'll be using a templating engine called EJS.

EJS stands for Embedded JavaScript, and it lets us inject JavaScript directly into our HTML by surrounding it with special marker tags.

We can use embedded JavaScript to either:

1. Produce values that will be printed into the HTML or,
2. Define control flow that will let us loop over and include conditionals in our HTML.

Here's what the above blocks of code would look like in EJS:

```html
<% const myName = 'Kate'; %>
<div id='mydiv'>
  <p>
    Hello, my name is <%= myName %>.
    <a href='/<%= myName %>'>Learn more</a>
  </p>
</div>
```

Short and sweet, right? Notice the `<% %>` and `<%= %>` tags in the above block. These are what allow us to **inject** JavaScript into our HTML. ( Flounders, squids, clown tags... But we usually end up calling them clown tags.)

- `<% %>` allows us to declare variables, do loops, do conditionals, etc. Normal JavaScript-y things.
- `<%= %>` allows us to output the values of variables.
- There are a few other clown tag variations. You can check them out [in the EJS docs](http://ejs.co/).

Files that use EJS have to have the extension `.ejs`. For example: `index.ejs`.

We'll see some examples of this in a few minutes, after we learn how to...

### Add a templating engine to an Express app!

Adding the view engine is a fairly straightforward process.

- Install the templating engine of choice. We're using EJS, so the command is `npm install ejs --save`.
- Create the `views` directory right inside `quote-sta-gram-starter` -- NOT in any of the subfolders. Inside it, create a file called `index.ejs`. This will be blank for now.
- Right before the static file setup in `server.js`, we're going to add two lines, one to tell the app where to look for our templates and the other telling it what kind of template to expect.

```js
// where to look for the template:
//       | what we're setting
//       V           v where to look for the views
app.set('views', path.join(__dirname, 'views'));
// what kind of template:
//       | what we're setting
//       V               v what kind of view engine to expect
app.set('view engine', 'ejs');

Express has a default value for `views` which is a directory `views/` in the root directory of the project (same place we keep ours). 
We don't need to set that option unless we put our views someplace else.
```

Now what?

### `res.render`

Before, we used `res.send`, which is a method on the response object that allows us to send data back to the client. `res.render` is a similar concept, except it allows us to first put all that data into a template.

Here's what the syntax for rendering an index page with a `'hello world!` message looks like:

```js
//              | what file to look for (`views/[whatever].ejs`, in this case `views/index.ejs`)
//              V        v an object that contains the data we're sending
res.render('index', { message: 'Hello world!' });
```

This can go in place of `res.send` in the `app.get` function.

```js
app.get('/', function(req, res) {
  res.render('index', { message: 'Hello world!'});
});

```

Then we can use **`message`** in our `index.ejs` file, like so:

```html
<h1><%= message %></h1>
<!-- outputs `<h1>Hello world!</h1>`  -->
```

This is cool, but not that exciting. Let's pass in some more data.

```js
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Hello world!',
    documentTitle: 'This is my quotes app!!',
    subTitle: 'Read some of the coolest quotes around.'
  });
});
```

Now we can access all of these variables in our EJS.

# Templating with conditionals and loops

One of the powerful things about EJS is that it allows us to adjust the page layout based on what data is passed to it. Let's add some dynamic content to our index page.

### Conditionals

First, let's add a boolean to the object we're sending to the view:

```js
// in server.js
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Hello world!',
    documentTitle: 'This is my quotes app!!',
    subTitle: 'Read some of the coolest quotes around.',
    showMore: true,
  });
});
```

Then, we can access it in `index.ejs`:

```html
<% if (showMore === true) { %>
  <div class='more'>
    <p> It's super cool and great.</p>
  </div>
<% } %>
```

- What do we notice about this syntax?
- What happens if we change the `showMore` value in `server.js`?

### Loops

Using a loop in your view feels similar to using a conditional. Add this to `index.ejs`:

```html
<% for (let i = 0; i < 10; i++) { %>
  <p>This is loop # <%= i %> </p>
<% } %>
```

And we can loop through arrays that we pass to the view as well.

```js
// in server.js
app.get('/', function(req, res) {
    res.render('index', {
      message: 'Hello world!',
      documentTitle: 'This is my quotes app!!',
      subTitle: 'Read some of the coolest quotes around.',
      showMore: true,
      quoteAuthors: ['Unknown', 'Yoda', 'CS Lewis', 'Frank Chimero', 'Pablo Picasso', 'Italo Calvino', 'T. S. Eliot', 'Samuel Beckett', 'Hunter S. Thompson'],
  });
});

```

```html
<!-- in index.ejs -->
<p>We have quotes by <% quoteAuthors.forEach(function(author) { %>
  <%= author %>,
<% }) %>.</p>
```

## 🚀 Mini-Lab: Let's all get on the same...view - 15min.

In the quote-sta-gram-starter directory, we're going to add views onto the app we've been building out.

Once your quotes-begin has a working server that can perform CRUD on quotes using JSON, follow these steps using the above notes as reference to begin adding views to the app.

Here's a refresher on the steps:

1. Install the ejs package from NPM (`npm install --save ejs`)
2. Create a `views` directory with an `index.ejs`
3. Set the view engine and views directory in `server.js`
4. Update `app.get` to use `res.render` and pass in some data
5. Template out `index.ejs` to utilize the data
6. Keep refreshing the page to check your work!

# Adding additional views & using partials

### All quotes view

- If you check out our quotesController, it is currently sending a `json` back. Modify it to set the data to `res.locals` and call `next()` middleware function.(which we will define next, `next()` get it  :wink:)

```js
index(req, res, next) {
  quoteDB.findAll()
    .then((quotes) => {
      res.locals.quotes = quotes;
      next();
    })
    .catch(err => next(err));
},
```

To modularize our application even further, and make sure we have appropriate error handling, we will create a viewController that would handle all templates rendering and error handling.

Create a new file `viewsController.js` in the controllers folder.
make sure to export the contents.

```js
module.exports = {
  showQuotes(req, res) {
    res.render('quotes/quote-index', {
      data: res.locals.quotes,
      });
    },
}
```

Great, we are telling the controller to use a 'quote-index' and pass the data from locals to it.

We haven't created out template yet. Let's go ahead and do so:

- In `views` make a new directory `quotes`.
- In the `views/quotes` directory, make a new file, `quotes-index.ejs`. (**NOTE**: It's a good idea to separate the views for your different routes into different folders, and name them as descriptively as possible. Otherwise, as your app grows, you'll lose track of what goes where and so on.)

- In `quotes-index.ejs`, make sure there's an HTML5 boilerplate and then loop through the quotes array(`data` that is being passed from the viewController), adding the title, author, and genre of each one to the page.

- Finally, tell our routes to use our brand new viewController to render the data. Like so:

```js
/* don't forget to import the viewsController!!! */
const views = require('../controllers/viewsController');

quotesRouter.route('/')
  .get(quotesController.index, views.showQuotes);
```

## 🚀 Lab 2: Keep working in `quote-sta-gram-starter` directory!

By the end of this lab, your app should have:

- A view for the `/quotes` route.
- Also, what is `locals` you may ask - [HERE](http://expressjs.com/en/api.html#res.locals) are the docs 👍🏼

## Single quote view

We already have the route for a single quote set up, and it already delivers just one quote, but with JSON format. Let's build it out just like we did the all-quotes page.

- We also have a controller for getting a single quote from the database. However, need to change our `res.send` to `res.locals` and call `next()`, just like before.

```js
getOne(req, res, next) {
  quoteDB.findById(req.params.id)
    .then((quote) => {
      console.log(quote);
      res.locals.quote = quote;
      next();
    })
    .catch(err => next(err));
},
```
- Let's add a method to viewsController for rendering a single quote:

```js
/* just like with ALL quotes, we are grabbing the data from res.locals */
showOne(req, res) {
  res.render('quotes/quote-single', {
    data: res.locals.quote,
  });
},
```
- In `views/quotes`, make a file `quote-single.ejs` and render all the data that we are passing from locals 👍

```js
<div class='quote'>
  <h1><%= data.content %></h1>
  <h3>Author: <%= data.author %></h3>
  <h3>Genre: <%= data.genre_type %></h3>
  <a href='/quotes/'>See all quotes</a>
</div>
```
- Don't forget to chain the middleware functions in our router:

```js
quotesRouter.route('/:id')
  .get(quotesController.getOne, views.showOne)
```

- Also, now we can add a link to each individual quote page in `quotes-index.ejs`. :)


### Modularizing our EJS

Let's take a look at the views files we have so far. What do they all have in common? We can abstract some of those out using **partials**.

Partials are pretty much what the name sounds like -- parts of your HTML that can be inserted into any document. For example, if we were to abstract the HTML5 boilerplate to its own `boilerplate.ejs` file, we could put it at the top of any file by saying:

```html
<% include ./partials/boilerplate %>
```
OR
```html
<% include ../partials/boilerplate %>
```
(Depending on where in the views directory you are.)

Let's do this together. We also like abstracting the `</body></html>` tags to their own partial, for neatness: `footer.ejs`.

You can even nest partials inside of other partials. For example, if we decided to make a `navigation.ejs` partial and add a menu bar, we could include it in the `boilerplate.ejs` partial :inception:

## 🚀 Lab 3: Keep working in `quotes-views-begin` directory!

By the end of this lab, your app should have:

- A view for the `/quotes/[number]` route
- A `boilerplate.ejs` partial and an `footer.ejs` partial
- BONUS: Try creating a navigation partial. Include it in the boilerplate.

# The CRUD view pattern

### What is CRUD?

CRUD, in the web development context, stands for **C**reate, **R**ead, **U**pdate, **D**elete. Most apps are, at their core, CRUD apps: creating, updating, editing, and deleting information like Facebook posts, Pinterest pins, Etsy listings, etc. is essential.

So in the end, our `views/quotes` directory would look something like this:

```bash
quotes
  ├── quote-index [`/quotes`]
  ├── quote-add [`/quotes/add`]
  ├── quote-single [`/quotes/:id`]
  └── quote-edit [`/quotes/:id/edit`]
```

There's no specific delete page -- we can have delete buttons `quote-index` and `quote-single` that upon delete will redirect to the index view. And `quotes-edit` is specific to the quote we want to edit.

### Creating the `/quotes/add` route

First, let's create a very simple form view, `views/quotes/quote-add.ejs`:

```html
<% include ../partials/boilerplate %>

<form method='POST' action='/quotes'>
  <input name="content" type="text" placeholder="Quote" />
  <input name="author" type="text" placeholder="Author" />
  <input type='submit' value='Submit!' />
</form>
<% include ../partials/footer %>
```

This might look a little different from forms you've seen so far, notably the `method` and `action` attributes.

- `method` just refers to the type of HTTP action we're taking. It will nearly always be `POST` in all caps.
- `action` refers to the endpoint the form will post its data to. In this case, just the `quotes` main route.

- In the quotesController, create a makeBlankQuote method that would just create an empty quote, set it to locals and call `next()` function as well:

```js
makeBlankQuote(req, res, next) {
  const blankQuote = {
    id:      null,
    content: null,
    author:  null,
    genre_type: null,
  };
  res.locals.quote = blankQuote;
  next();
},
```
- Let's create a viewController that would be dumb, and just renders the form:

```js
showAddForm(req, res) {
  res.render('quotes/quote-add');
},

```
- Finally, we have to pass it to the route. **IMPORTANT**: This **MUST** go above the "get individual quotes" route, also pass the empty quote to it as well:

```js
/* add quote route */
quoteRoutes.get('/new', controller.makeBlankQuote, view.showAddForm);
```
Okay, now the form is rendering. Cool.


### Getting the data from the form

Because the form is making a `POST` action to the backend, we need a `post` route to catch it. We already have the the route set up and create controller action build out. Let's use it!

```js
/* post to quotes */
quotesRouter.route('/')
  .get(quotesController.index, views.showQuotes)
  .post(quotesController.create, views.handleCreate);
```
- Notice `views.handleCreate`, this method will just redirect to `/quotes` route. Let's build it out:

```js
handleCreate(req, res) {
  res.redirect('/quotes');
},
```

## 🚀 Lab 4: Let's get caught up again.

Catch up with POST functionality 👍🏼


### Implementing DELETE functionality.

Would you need a separate view for DELETE? 🤔 Nope.

We will just add a button in the single view page. Well, it has to be a form, so we can specify the action and method 👍🏼. Check it out:

```js
<form action="/quotes/<%= data.id %>?_method=Delete" method="POST">
  <input type="Submit" value="Delete"/>
</form>
```
Because form's natural behavior to POST, we need a workaround to be able to delete.
We will need to add another package to our application, `method-override`. See, in our form the method is still POST, but we are overriding it with in the query string.

Cool, new we need to add a configuration to our `server.js`.
Like so:

```js
const methodOverride = require('method-override');
/* we are telling the package to use the method from query string instead of default POST ;) */
app.use(methodOverride('_method'));
```

- Refactor the quotesController to call `next()`:
```js
destroy(req, res, next) {
  quoteDB.destroy(req.params.id)
    .then(() => next())
    .catch(err => next(err));
},
```
- Add a handler to the viewsController that would just redirect to the `index` view:
```js
handleDelete(req, res) {
  res.redirect('/quotes');
},
```

## 🚀 Lab 5: Let's get caught up again.

Finish up the delete functionality.

## 🚀 Lab 6: Independent work.

Finally, we're at the end of our adventure ------ you will independently build out the functionality to edit!! If you get stuck, look at the diagram on the board, and as a peek into the `quotes-views-final` on a separate branch ;)
