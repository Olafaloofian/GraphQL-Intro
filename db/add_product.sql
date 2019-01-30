insert into graphql_products (name, price, picture, stock, category)
values (${name}, ${price}, ${picture}, ${stock}, ${category})
returning *;

select p.id, p.name, p.price, p.picture, p.stock, c.id as category_id, c.name as category_name, c.description as category_description from graphql_products p
join graphql_product_categories c on p.category = c.id
where p.name = ${name};