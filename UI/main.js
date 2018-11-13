/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
} 

function myFunction(x) {
    x.classList.toggle("change");
} 

function todo(){
    openNav(); closeNav();
}
// ('.like-btn').on('click', function() {
//    $(this).toggleClass('is-active');
// });

// ('.minus-btn').on('click', function(e) {
//     e.preventDefault();
//     var $this = $(this);
//     var $input = $this.closest('div').find('input');
//     var value = parseInt($input.val());
 
//     if (value <= 1) {
//         value = value - 1;
//     } else {
//         value = 0;
//     }
 
//   $input.val(value);
 
// });
 
// ('.plus-btn').on('click', function(e) {
//     e.preventDefault();
//     var $this = $(this);
//     var $input = $this.closest('div').find('input');
//     var value = parseInt($input.val());
 
//     if (value = 0) {
//         value = value + 1;
//     } else {
//         value =100;
//     }
 
//     $input.val(value);
// });

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
function openEditForm(product) {
    document.getElementById("editmyForm").style.display = "block";

    let edit_form = document.getElementById('edit-product-form')
    // edit_form.elements.namedItem('product_id').value = product.product_id
    edit_form.elements.namedItem('product_name').value = product.product_name
    edit_form.elements.namedItem('category').value = product.category
    edit_form.elements.namedItem('quantity').value = product.quantity
    edit_form.elements.namedItem('reorder_level').value = product.reorder_level
    edit_form.elements.namedItem('price').value = product.price

    var input = document.createElement("input")
    input.setAttribute("type", "hidden")
    input.setAttribute("product_id", "product_id")
    input.setAttribute("value", product.product_id)

    console.log(input.value)

    

    edit_form.appendChild(input)

}

function closeEditForm() {
    document.getElementById("editmyForm").style.display = "none";
}
function editProfile(){
    document.getElementById("content").style.display="none";
    document.getElementById("edit").style.display="block";
}
