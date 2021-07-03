// Capturing the Button From The DOM
var getResultBtn = document.getElementById("getResultBtn");


// Functional Logic to perform the task
var outputFromFn = [];
const getResultFn = () => {

    var inputString = document.getElementById("inputTextBoxId").value;
    var arrayOfObjects = [];

    // Object model of each product
    var tempObject = {
        name: "",
        prodDesc: "",
        price: 0
    };

    // This checker is necessary since we have commas inside product desccription 
    // as well, so to differentiate b/w those commas and general commas
    var insideProductDesc = false;

    var previousCursor = 0;
    for(let i = 0; i < inputString.length; i++){
        if(insideProductDesc) {
            switch(inputString.charAt(i)) {
                case "'":
                    insideProductDesc = false;
            }
        }else {
            switch(inputString.charAt(i)) {
                case "'":
                    insideProductDesc = true;
                    previousCursor = i + 1;
                case ",":
                    if(tempObject.name === "") {
                        tempObject.name = inputString.slice(previousCursor, i);
                        previousCursor = i + 1;
                    } else if(tempObject.prodDesc === "") {
                        tempObject.prodDesc = inputString.slice(previousCursor, i);
                        previousCursor = i + 1;
                    } else {
                        tempObject.price = parseInt(inputString.slice(previousCursor, i));
                        previousCursor = i + 1;
                        arrayOfObjects.push(tempObject);

                        // reseting the product object after all the three values are added
                        var tempObject = {
                            name: "",
                            prodDesc: "",
                            price: 0
                        };
                    }
            }
        }
        
    }
    // outputFromFn = arrayOfObjects;
    arrayOfObjects.sort((a, b) => {
        return a.price - b.price;
    });
    console.log(arrayOfObjects);
    arrayOfObjects.map((product) => {
        const productText = document.createElement('p');
        const node = document.createTextNode(product.name + " " + product.prodDesc + " " + product.price);
        productText.appendChild(node);
        document.getElementById("outputTextArea").appendChild(productText);
    })
    

}

// Adding Event listener
getResultBtn.addEventListener('click', getResultFn, false);
// console.log(outputFromFn);

// Printing the output in the ui

