export let searchImplementation = function() {
    let inputText, filteredText, ulElementData, liElementData, idx, aElementData, eachShowTitle;

    inputText = document.getElementsByClassName("my-input")[0];
    filteredText = inputText.value.toUpperCase();
    ulElementData = document.getElementById("myul");
    liElementData = ulElementData.getElementsByTagName("li");

    for (idx = 0; idx < liElementData.length; idx++) {
        aElementData = liElementData[idx].getElementsByTagName("h3")[0];
        eachShowTitle = aElementData.textContent || aElementData.innerText;

        if (eachShowTitle.toUpperCase().indexOf(filteredText) > -1) {
            liElementData[idx].style.display = "";
        } else {
            liElementData[idx].style.display = "none";
        }
    }
}

export function debounce(func, wait) {
    let timeout;
    return function debounced() { 
        let context = this;
        console.log(this);
        let args = arguments;

        function later() {
            func.apply(context, args);
        }

        if (timeout) {
            clearInterval(timeout);
        }

        timeout = setTimeout(later, wait);
    }
}