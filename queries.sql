-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select
  p.id,
  productname,
  categoryname
from product p 
join category c
  on p.CategoryId = c.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select 
  o.id,
  s.CompanyName,
  o.orderdate
from [order] o
join shipper s
  on o.shipvia = s.Id
where orderdate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select 
  od.orderid,
  p.productname,
  od.quantity
from orderdetail od
join product p
  on od.productid = p.Id
where od.orderid = '10251'
order by p.productname;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select 
  od.OrderId,
  c.CompanyName,
  e.LastName EmployeeLastName,
  count(od.orderid) NumberOfOrders
from orderdetail od
join [order] o
  on od.OrderId = o.Id
join customer c
  on o.customerid = c.Id
join employee e
  on o.EmployeeId = e.Id
group by od.orderid;

-- STRETCH #1
select 
	c.categoryname,
  count(c.categoryid) ProductsPerCategory
from products p
join categories c
	on p.categoryid = c.categoryid
group by c.categoryname;

-- STRETCH #2
select 
	orderid,
  count(orderid) ItemCount
from OrderDetails od
group by orderid
