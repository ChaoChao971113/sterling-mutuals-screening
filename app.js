var MENU_ITEMS_ARRAY = [];
var TOTAL_PRICE = 0;

ready();


function ready()
{
    if (window.XMLHttpRequest)
    {
           xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","food.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 

    document.write("<table border='1'>");
    var x=xmlDoc.getElementsByTagName("FOOD");
    var menu = document.getElementById("menu-table");

    


    for (i=0;i<x.length;i++)
    {     
            var name = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
            var price = x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;

            var data = {"id":i,"name":name, "price":parseFloat(price),"quantity":0,"sub_total":0};
            MENU_ITEMS_ARRAY.push(data);

            var cell_name = document.createElement("th");
            var cell_price = document.createElement("th"); 
            //apppend cells to row
            cell_name.innerText = name;
            cell_price.innerText = price;
            var row = document.createElement("tr");

            var quantity = document.createElement("input");
            quantity.setAttribute("class","quantity");
            quantity.setAttribute("type","number");
            quantity.setAttribute("min","0");
            quantity.setAttribute("max","5");
            quantity.setAttribute("value","0");
            quantity.setAttribute("id",i);

            var cell_quantity = document.createElement("th");
            cell_quantity.appendChild(quantity);

            var cell_sub = document.createElement("th");
            cell_sub.setAttribute("class","sub_total");
            cell_sub.innerText = 0;

            row.appendChild(cell_name);
            row.appendChild(cell_price);
            row.appendChild(cell_quantity);
            row.appendChild(cell_sub);
            menu.appendChild(row);
    }

    document.getElementById("0").setAttribute("max","1");

    console.log(MENU_ITEMS_ARRAY[0]["price"]);

    var quantityInputs = document.getElementsByClassName("quantity");
    for(var i =0; i < quantityInputs.length;i++)
    {
        var target = quantityInputs[i];
        console.log(target);
        target.addEventListener('change',changeSubtotal);
    }

    document.getElementById("place_order").addEventListener('click',placeOrder);

}


function changeSubtotal(event)
{

    var input = event.target;
    var value = event.target.value;

    
    
    var new_value = value * MENU_ITEMS_ARRAY[input.id]["price"];
    new_value = new_value.toFixed(2);
    MENU_ITEMS_ARRAY[input.id]["sub_total"] = new_value;
    document.getElementsByClassName("sub_total")[input.id].innerHTML = new_value;
    changeTotal();
}

function changeTotal()
{
    TOTAL_PRICE = 0
    var sub_total_list = document.getElementsByClassName("sub_total");
    for(var i=0; i< sub_total_list.length;i++)
    {
        TOTAL_PRICE+=parseFloat(sub_total_list[i].innerHTML);
    }
    TOTAL_PRICE = TOTAL_PRICE.toFixed(2);
    document.getElementById("TOTAL_PRICE").innerHTML = "$" + TOTAL_PRICE.toString();
}

function placeOrder()
{
    if(TOTAL_PRICE == 0)
    {
        window.alert("You have not selected a Item!!!!");
        return;
    }

    window.alert("Your Order has been Placed with ID: " +Math.random().toString(36).slice(2));
    window.location.href = "comfirmed.html";
}