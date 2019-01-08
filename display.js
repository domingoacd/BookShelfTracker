class Display{

    static books(bookStatus) {
        const books = (typeof bookStatus == "string") ? Storage.getBooks(bookStatus) : Storage.getBooks();
        const booksContainer = document.getElementById("booksDisplay");
        const colors = {"reading": "bg-warning",
                        "to read": "bg-info",
                        "completed": "bg-success"}
        booksContainer.innerHTML = "";
        
        books.forEach(book =>{
            const newBook = document.createElement("div");
            newBook.classList.add("card");
            newBook.classList.add("mb-3");
            newBook.innerHTML = "<div class='dropdown'>"
                                    +"<button class='dropdown-toggle btn' type='button' data-toggle='dropdown'>Change state</button>"
                                    +"<div class='dropdown-menu' data-code='"+book.code+"'>"
                                        +"<a href='#' class='dropdown-item' data-bookChange>To Read</a>"
                                        +"<a href='#' class='dropdown-item' data-bookChange>Reading</a>"
                                        +"<a href='#' class='dropdown-item' data-bookChange>Completed</a>"
                                        +"<a href='#' class='dropdown-item  text-danger' data-bookChange>Delete</a>"
                                    +"</div>"
                                +"</div>"
                                +"<a href='#' class='text-white' data-toggle='modal' data-target='#bookInfo'>"
                                    +"<div data-book='open' data-code='"+book.code+"' class='card-body "+colors[book.status]+"'>"
                                        +"<h3>"+book.title+"</h3>"
                                        +"<p>"+book.author+"</p>"
                                        +"<p>"+book.category+"</p>"
                                     +"</div>"
                                +"</a>"
            booksContainer.appendChild(newBook);
        });   
    }
    static bookInfo(book) {
        const bookTitle = document.getElementById("bookName");
        const bookInfoBody = document.getElementById("bookInfoBody");
        const bookCode = book.getAttribute("data-code");
        bookInfoBody.setAttribute("data-code", bookCode);
        bookTitle.innerText = book.querySelector("h3").innerText;
    }
    static questions() {
        const bookCode = this.parentNode.getAttribute("data-code");
        const bookCategory = Storage.getBookCategory(bookCode);
        const questions = getRandomQuestionsByBookCategory(bookCategory);

        
    }
    static booksByStatus(status) {
        if(status != "faq"){
            Display.books(status);
        }
    }
}