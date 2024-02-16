import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

let money = document.getElementById('money')
let expensediv = document.getElementById('expensediv')

let inputbudget = document.getElementById('inputbudget')
let expenseinput1 = document.getElementById('expenseinput1')
let expenseinput2 = document.getElementById('expenseinput2')
let savebudget = document.getElementById('savebudget')
let saveexpense = document.getElementById('saveexpense')
let modaldiv = document.getElementById('modaldiv')


let cash = 0
let expenseName = ''
let expense
money.innerText = '$' + cash

savebudget.addEventListener('click', () => {
    cash += Number(inputbudget.value)
    money.innerText = '$' + cash.toFixed(2)
    saveToLocalStorage('+' + inputbudget.value)
    showbudget()
})

inputbudget.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        cash += Number(inputbudget.value)
        money.innerText = '$' + cash.toFixed(2)
        saveToLocalStorage('+' + inputbudget.value)
    }
})

expenseinput1.addEventListener("input", () => {
    expenseName = expenseinput1.value;
});

expenseinput2.addEventListener("input", () => {
    expense = Number(expenseinput2.value);
});

saveexpense.addEventListener("click", () => {
    // Check if either expense or expenseName is empty or 0
    if (!expense || expense === 0 || expenseName.trim() === '') {
        alert('Please add a valid expense and expense name!');
        return; // Exit the function early if validation fails
    }

    cash -= Number(expense);

    // Update the displayed money
    money.innerText = '$' + cash.toFixed(2);

    // Capitalize the first letter of the expenseName
    expenseName = expenseName.charAt(0).toUpperCase() + expenseName.slice(1);

    // Save to local storage
    saveToLocalStorage(expenseName);
    saveToLocalStorage('-' + expenseinput2.value);

    // Show the expense in the expensediv
    showexpense();
});

const showbudget = () => {
    let p = document.createElement('p')
    p.innerText = '+' + inputbudget.value
    p.classList.add('col-7', 'divtxt')

    let namep = document.createElement('p')
    namep.innerText = 'Added Budget : '
    namep.classList.add('col-5', 'px-0', 'text-end', 'divtxt')

    let button = document.createElement('button')
    button.innerText = "Remove"
    button.type = 'button'
    button.classList.add('col-12', 'btn', 'btn-danger', 'smallbtn', 'pb-1')
    button.addEventListener('click', () => {

        cash -= Number(inputbudget.value)
        money.innerText = '$' + cash.toFixed(2)

        removeFromLocalStorage(inputbudget.value);

        p.remove();
        namep.remove();
        button.remove();

    })

    expensediv.appendChild(namep)
    expensediv.appendChild(p)
    expensediv.appendChild(button)
}

const showexpense = () => {
    let p = document.createElement('p')
    p.innerText = '-' + expenseinput2.value
    p.classList.add('col-7', 'divtxt')

    let namep = document.createElement('p')
    namep.innerText = expenseName + ':'
    namep.classList.add('col-5', 'px-0', 'text-end', 'divtxt')

    let button = document.createElement('button')
    button.innerText = "Remove"
    button.type = 'button'
    button.classList.add('col-12', 'btn', 'btn-danger', 'smallbtn', 'pb-1')
    button.addEventListener('click', () => {

        cash += Number(expenseinput2.value)
        money.innerText = '$' + cash.toFixed(2)

        removeFromLocalStorage(expenseName, '-' + expenseinput2.value);

        p.remove();
        namep.remove();
        button.remove();

    })
    expensediv.appendChild(namep)
    expensediv.appendChild(p)
    expensediv.appendChild(button)
}

const displaysave = () => {
    let stored = getlocalStorage();

    stored.map(item => {
        let p = document.createElement('p');
        let namep = document.createElement('p');
        let button = document.createElement('button');

        if (item.startsWith('+')) {
            p.innerText = item;
            p.classList.add('col-7', 'divtxt');

            namep.innerText = 'Added Budget : ';
            namep.classList.add('col-5', 'px-0', 'text-end', 'divtxt');

            button.innerText = "Remove";
            button.type = 'button';
            button.classList.add('col-12', 'btn', 'btn-danger', 'smallbtn', 'pb-1');
            button.addEventListener('click', () => {
                cash -= Number(item.slice(1));
                money.innerText = '$' + cash.toFixed(2);
                removeFromLocalStorage(item);
                p.remove();
                namep.remove();
                button.remove();
            });
            expensediv.appendChild(namep);
            expensediv.appendChild(p);
            expensediv.appendChild(button);

        } else if (item.startsWith('-')) {
            p.innerText = item;
            p.classList.add('col-7', 'divtxt');

            namep.innerText = 'Expense: ';
            namep.classList.add('col-5', 'px-0', 'text-end', 'divtxt');

            button.innerText = "Remove";
            button.type = 'button';
            button.classList.add('col-12', 'btn', 'btn-danger', 'smallbtn', 'pb-1');
            button.addEventListener('click', () => {
                cash += Number(item.slice(1));
                money.innerText = '$' + cash.toFixed(2);
                removeFromLocalStorage(item);
                p.remove();
                namep.remove();
                button.remove();
            });
            expensediv.appendChild(namep);
            expensediv.appendChild(p);
            expensediv.appendChild(button);
        }
    });

    console.log(stored);
};


displaysave()

const calculateTotalAmount = () => {
    let stored = getlocalStorage();
    let totalAmount = 0;

    stored.forEach(item => {
        if (item.startsWith('+')) {
            totalAmount += Number(item.slice(1));
        } else if (item.startsWith('-')) {
            totalAmount -= Number(item.slice(1));
        }
    });

    return totalAmount;
};

let totalAmount = calculateTotalAmount();

cash = totalAmount;
money.innerText = '$' + cash.toFixed(2);