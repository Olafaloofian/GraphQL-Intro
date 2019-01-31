## GraphQL Lecture

GraphQL is really exciting and a highly sought-after skill for 2019. My goal is to leave you guys feeling comfortable enough to be able to start using GraphQL in your own projects and tell potential employers you have some experience in it. It is a lot to cover in a single day, but what's new eh? That's just how we do it at DevMountain!

I want to reiterate what exactly GraphQL is and does for your code because I was confused about it for a while. It's not a replacement for SQL or a place to store data. It's a tool to make data retrieval and manipulation much quicker and more intuitive. For you guys, in most cases GraphQL will be set up and live on your server, where it can replace or exist alongside your REST-ful API endpoints. Then, instead of making a web request (like with axios) on the front end, you just query your GraphQL schema and get what you need!

Alright, let's go set up our server!
<!-- => server/index -->

### GraphiQL

One super nice feature of GraphQL is that it is self documenting. What the crap does that even mean? Let's find out. Open up a browser and go to localhost:4020(PORT NUMBER)/graphql. The Docs tab on the top right allows us to search our own schema and see the structures we have set up for ourselves. The coolest thing you can do in GraphiQL, however is entering and running statements on the left side of the pane.

<!-- Go through the following queries/mutations to show them how to use GraphiQL -->
<!-- Show them how nice the errors are and how this client pretty much knows exactly what you are trying to get at. Explain that this is because of the type system. -->

```graphql
query getProducts {
  products {
    name
		id
    price
    picture
    stock
    category {
      id
      name
      description
    }
  }
}

query getProduct {
  product(id: 3) {
    name
    price
    picture
    category {
      description
    }
  }
}

query getProductCategory {
  productCategory(id: 3) {
    name
    description
    id
  }
}

query getProductCategories {
  productCategories{
    id
    name
    description
  }
}

mutation deleteProduct {
  deleteProduct(id: ???) {
    name
  }
}

mutation newProduct {
  submitProduct(input: {name: "Buzz Saw", price: 12.88, picture: "https://img.itch.zone/aW1hZ2UvNDI2NzIvMTg0MDIxLmpwZw==/original/ddX2Gg.jpg", stock: 11, category: 2}) {
    name
    price
    category {
      id
    }
  }
}
```

Let's figure out how to use GraphQL in the front end of a React App! The first thing we need to do is enable GraphQL in our src/index file.
<!-- => index.js -->


<!-- TODO: The Schema could be refactored to use a Product interface with different types of products (toys, clothes, tools) that all have some common fields but also a few unique ones. Maybe good for an article? --> 

Resources:
`npm i express express-graphql graphql graphql-tag massive react-apollo apollo-boost dotenv cors`

[Abstract Syntax Trees](https://blog.buildo.io/a-tour-of-abstract-syntax-trees-906c0574a067)

[GraphQL Schema Language Cheat Sheet](https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6)

[Zero to GraphQL in 30 Minutes](https://www.youtube.com/watch?v=UBGzsb2UkeY)

[GraphQL Documentation](http://graphql.org/)

[Connecting React with Apollo Client](https://www.apollographql.com/docs/react/essentials/get-started.html)

[GraphQL - Everything You Need to Know](https://javascript.works-hub.com/learn/graphql-everything-you-need-to-know-48719?utm_source=Slack&utm_medium=Blog&utm_campaign=Ben)