create table if not exists graphql_product_categories(
    id serial primary key,
    name text unique,
    description text
);

insert into graphql_product_categories(name, description)
values ('Toys', 'A selection of toys for kids. Or adults who still like to have fun.');

insert into graphql_product_categories(name, description)
values ('Tools', 'For when things need a-fixin.');

insert into graphql_product_categories(name, description)
values ('Clothing', 'Humans are the only animals that use them!');

create table if not exists graphql_products(
    id serial primary key,
    name text unique,
    price decimal,
    category int references graphql_product_categories(id),
    picture text,
    stock int
);

insert into graphql_products(name, price, category, picture, stock)
values ('Slime', 7.99, 1, 'https://sc01.alicdn.com/kf/HTB1Af2XSXXXXXbGXFXXq6xXFXXXe/slime-toy-barrel-oil-caution-party-funny.jpg_350x350.jpg', 34);

insert into graphql_products(name, price, category, picture, stock)
values ('Taser', 28.75, 1, 'https://www.gannett-cdn.com/-mm-/23dab82c7b34bacab250842e2893ee3d5a5d19a8/c=214-0-2099-1417/local/-/media/2017/05/16/Reno/RGJ/636305443058776527-GettyImages-119426761.jpg?width=534&height=401&fit=crop', 11);

insert into graphql_products(name, price, category, picture, stock)
values ('Cyanide', 289.85, 1, 'https://www.azom.com/images/Article_Images/ImageForArticle_12820(4).jpg', 5);

insert into graphql_products(name, price, category, picture, stock)
values ('Angle Grinder', 34.99, 2, 'https://www.harborfreight.com/media/catalog/product/i/m/image_22829.jpg', 22);

insert into graphql_products(name, price, category, picture, stock)
values ('Skin Irradiator', 52.15, 2, 'https://media.allure.com/photos/5a626b19ae3eea0905832701/3:4/w_2274,h_3032,c_limit/skin-care-gadget.jpg', 131);

insert into graphql_products(name, price, category, picture, stock)
values ('Automatic Corkscrew', 31.87, 2, 'https://pixel.nymag.com/imgs/daily/strategist/2018/07/20/electric-wine-openers/1.w710.h473.2x.jpg', 82);

insert into graphql_products(name, price, category, picture, stock)
values ('Wearable Umbrella', 4533.29, 3, 'https://i.pinimg.com/236x/bf/90/8e/bf908eede3a437486078affd0a802605--crazy-dresses-amazing-dresses.jpg', 4);

insert into graphql_products(name, price, category, picture, stock)
values ('Helicopter Hat', 13.10, 3, 'https://images-na.ssl-images-amazon.com/images/I/61ZJCvc8kJL._SX355_.jpg', 45);

insert into graphql_products(name, price, category, picture, stock)
values ('Turd Costume', 29.55, 3, 'https://i.pinimg.com/736x/17/34/8a/17348a48d50caa901c2e26a854a7d585--halloween-costumes-men-funny-costumes.jpg', 32);