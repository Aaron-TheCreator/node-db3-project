-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName 
FROM Product AS P
JOIN Category AS C
ON P.CategoryID = C.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT id AS 'OrderID', ShipName AS 'Shipper Company Name'
FROM [Order] AS O
WHERE O.OrderDate < '2012-08-09';
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT [Quantity], [ProductName]
FROM OrderDetail AS OD
JOIN Product AS P
ON OD.ProductId = P.id
WHERE OD.OrderId = 10251
ORDER BY P.ProductName;
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT O.id AS 'Order ID',C.CompanyName AS 'Customer Company Name', E.LastName AS 'Employee L.Name'
FROM [Order] AS O
JOIN [Customer] AS C
ON O.CustomerId = C.id
JOIN [Employee] AS E
ON O.EmployeeId = E.id;