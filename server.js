require('dotenv').config();
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
// here if we are not in production environment, the above line of code import what is in .env file,
// then in the code below somewhere, process.env.DATABASE_URL will have that URL imported. 

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
// the above code is to let our server know that we've created a route for index, for '/'. So, we need to import it here to make sure it works. 

/*
app.set() is a method used to set application settings and configuration variables. app.set(name, value): name: A string representing the name of the setting you want to set.
value: The value you want to assign to the setting.
*/

app.set('view engine', 'ejs') 
 // When you are using a templating engine like EJS, Pug, or Handlebars in your Express application, you need to tell Express which view engine to use. Here, we are telling the app we want to set the view engine, which, in our case, is ejs.

app.set('views', __dirname + '/views') 
// we are setting where our views are coming from. They come from our /views folder.  __dirname is the current folder name, and we append '/views' to our current folder name __dirnam. 

app.set('layout', 'layouts/layout') 
// everything single file is going to be put inside of this layout file, so we don't have to duplicate all of the beginning and ending html of our project, such as the header and the footer. 

app.use(expressLayouts) // tell our express application that we want to use express layouts. 
app.use(express.static('public')) 
// tell our express where our public file is going to be. Public files are files such as style sheets, javascript, all of the images.   

const mongoose = require('mongoose')
// after run 'npm install mongoose' in the terminal, we are now importing it from the library.
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
/*
process.env.PORT:
process 是 Node.js 中的一个全局对象，它提供了与当前 Node.js 进程相关的信息和控制功能。
env 是 process 对象的一个属性，它是一个包含所有环境变量的对象。
PORT 是环境变量的名称。在不同的环境中，比如生产环境或者一些云服务提供商（如 Heroku），会通过环境变量的方式指定应用应该监听的端口。通过 process.env.PORT 可以获取这个环境变量的值。

|| 3000:
|| 是 JavaScript 中的逻辑或运算符。它的作用是在 process.env.PORT 有值时使用该值，如果 process.env.PORT 没有被设置（即值为 undefined、null、false、0、NaN 或空字符串），则使用默认值 3000。这样做的好处是代码具有更好的灵活性和可移植性，既可以在生产环境中使用环境变量指定的端口，也可以在开发环境中使用默认的 3000 端口。

app.listen(process.env.PORT || 3000) 这种写法让你的应用既可以在生产环境中使用服务器分配的端口，又能在本地开发时使用默认端口，提高了代码的灵活性和可移植性。
*/

// 'Routes' are also called 'Controllers'.


/*
关于使用express搭建网页的时候的不同文件夹的描述：

routes file: aka controllers, are folders for our routes. 这个文件夹主要用于存放路由相关的文件。路由定义了应用程序如何响应客户端的请求，也就是根据不同的 URL 和 HTTP 请求方法（如 GET、POST 等）来处理请求并返回相应的结果。

views file: contains all of our views. 该文件夹用于存放视图模板文件。视图模板定义了应用程序返回给客户端的页面的结构和内容。Express 支持多种视图引擎，如 EJS、Pug、Handlebars 等，你可以根据自己的需求选择合适的视图引擎。

Models file: all of our database models are here. 此文件夹用于存放与数据模型相关的文件。数据模型定义了应用程序中数据的结构和操作方法，通常与数据库交互。在 Node.js 中，常用的数据库有 MongoDB、MySQL 等，可以使用相应的 ORM（对象关系映射）或 ODM（对象数据映射）库来操作数据库，如 Mongoose 用于 MongoDB，Sequelize 用于 MySQL 等。

public file: 该文件夹用于存放静态文件，如 CSS 文件、JavaScript 文件、图片等。这些文件可以直接被客户端访问，无需经过服务器的处理。在 public 文件夹中可以创建一个 css 子文件夹，用于存放 CSS 文件，一个 js 子文件夹，用于存放 JavaScript 文件，一个 images 子文件夹，用于存放图片文件。

综上所述，routes 文件夹负责路由逻辑，views 文件夹负责页面模板，models 文件夹负责数据模型和数据库操作，public 文件夹负责存放静态文件。合理组织这些文件夹可以使项目结构更加清晰，易于维护和扩展。
*/
