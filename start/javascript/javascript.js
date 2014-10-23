/*
    Author:     Mysall
    Date:       Oct 2014
    Purpose:    Controls the page
*/

/* Variables for site */
var $               = function(elem){ return document.getElementById(elem)},
    mouseOutOfPage  = false, // False if mouse is in page - True is mouse is out of page
    searchValue     = "Empty search string";
    

/*
    --- Create the Search ---
*/
var searchContainer = [
    '<form method="get" action="https://www.google.com/search">',
    '<input id="homeSearch" type="text" name="q" placeholder="Search" autocomplete="off" autofocus>',
    '</form>'
].join('');

/* Add the search form to the main div */
$('searchContainer').innerHTML += searchContainer;

/*
    --- Create the links ---
*/

function addEvent(obj, event, func)
{
    if(obj.addEventListener)
    {
        obj.addEventListener(event, func, false);
    }
    else if(obj.attachEvent)
    {
        obj.attachEvent("on" + event, func);
    }
}

addEvent(window, "load", function(e)
{
    addEvent(document, "mouseout", function(e)
    {
        e           = e ? e : window.event;
        var from    = e.relatedTarget || e.toElement;
        if(!from || from.nodeName === "HTML")
        {
            mouseOutOfPage = true;
        }
        else
        {
            mouseOutOfPage = false;
        }
    });
});

/* Show links when focus is not on the box */
document.body.onmousedown = linkToggle();
function linkToggle()
{
    $('homeSearch').onblur = function()
    {
        if(mouseOutOfPage === false)
        {
            $('linkContainer').classList.add('show');
        }
        else{
            return;
        }
    }
    $('homeSearch').onfocus = function()
    {
        $('linkContainer').classList.remove('show');
    }
}

// Function to remove repetition between each link function
function repList()
{
    // Add new HTML to page
    $('searchContainer').innerHTML = searchContainer;
    // Return focus to input and hide links
    $('homeSearch').focus();
    $('linkContainer').classList.remove('show');
    // Add ability to open links again
    document.body.onmousedown = linkToggle();
}

/*
    --- Create YouTube ---
*/
$('youtube').onclick = function()
{
    // Replace Search form with plain input
    searchContainer = [
        '<input id="homeSearch" type="text" name="q" placeholder="Search YouTube" autocomplete="off" autofocus>',
        '<span id="youtubeHome"><a href="https://www.youtube.com">YouTube Homepage</a></span>'
    ].join('');
    repList();
    // Check for keypress
    $('homeSearch').addEventListener('keypress', function(e)
    {
        // Check if keypressed is 13 (enter key)
        if(e.keyCode === 13)
        {
            searchValue = $('homeSearch').value;
            window.location.replace("https://www.youtube.com/results?search_query=" + searchValue);
        } 
    });
    $('youtubeHome').onmousedown = function()
    {
        document.body.innerHTML = "";
        window.location.replace("https://www.youtube.com");
    }
}
/*
    --- Create the translate ---
*/

$('translate').onclick = function()
{
    var language = ["en", "ru"]; // Defaults to translating english => russian
    // Replace Search form with plain input
    searchContainer = '<input id="homeSearch" type="text" name="q" placeholder="Translate" autocomplete="off" autofocus>'
    repList();
    // Check for keypress
    $('homeSearch').addEventListener('keypress', function(e)
    {
        // Check if keypressed is 13 (enter key)
        if(e.keyCode === 13)
        {
            searchValue = $('homeSearch').value;
            
            if(searchValue.match(/[\u0400-\u04FF]/gi))
            {
                language = ["ru", "en"];
                window.location.replace("http://translate.google.com/?q=" + searchValue + "&sl=" + language[0] + "&tl=" + language[1]);
            }
            else if(searchValue.match(/[\w]/gi)){
                window.location.replace("http://translate.google.com/?q=" + searchValue + "&sl=" + language[0] + "&tl=" + language[1]);
            }
        }
    });
}
