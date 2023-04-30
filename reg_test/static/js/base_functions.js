    // body and theme button change 
    let ThemeBtn = document.querySelector("#theme-btn");
    var white = document.querySelector(".myImg_white");
    var dark = document.querySelector(".myImg_dark");

    const themeTypes = ["light", "dark"]
    const themeIcons = ["bx-moon", "bx-sun"]

    let currentTheme = localStorage.getItem("theme");


    function setTheme(theme) {
        localStorage.setItem("theme", themeTypes[theme])
    }


    function setIndicator(theme) {
        // remove all possible classes.
        ThemeBtn.classList.remove(themeIcons[0])
        ThemeBtn.classList.remove(themeIcons[1])
        // add desired class name.
        ThemeBtn.classList.add(themeIcons[theme])
    }


    // check theme and apply correct img
    function toggleImg(theme) {

        if (theme === 1){
        white.style.display = "inline";
            dark.style.display = "none";
        }else{
        white.style.display = "none";
            dark.style.display = "inline";
        }
    }


    // toggle if body is active or not
    function toggleBodyState(theme) {

        if (theme === 1){
            document.body.classList.add("active")
        }else{
            document.body.classList.remove("active")
        }
    }

    // Check current theme stored in loclae storage and apply
    if (currentTheme === null) {
        localStorage.setItem("theme", themeTypes[0])
        setIndicator(0)
        toggleBodyState(0)
        toggleImg(0)
        ThemeBtn.classList.remove("active")
    }

    if (currentTheme === themeTypes[0]) {
        setIndicator(0)
        toggleBodyState(0)
        toggleImg(0)
        ThemeBtn.classList.remove("active")
    }

    if (currentTheme === themeTypes[1]) {
        setIndicator(1)
        toggleBodyState(1)
        toggleImg(1)
        ThemeBtn.classList.add("active")
    }


    // theme button change icon
    ThemeBtn.onclick = function () {
    ThemeBtn.classList.toggle("active");
    if (ThemeBtn.classList.contains("active")) {
            toggleBodyState(1)
            setTheme(1)
            setIndicator(1)
            toggleImg(1)
            
        }else {
            toggleBodyState(0)
            setTheme(0)
            setIndicator(0)
            toggleImg(0)
        }
    };



    





      // show/hide sub menu when clicking on link
      let submenuLink = document.querySelectorAll(".icon-links");
      let saveclassName = submenuLink[0].parentElement

      const menuSize = ["enlarged", "minimized"]

      let showMenuState = localStorage.getItem("sub_menu_state");

      function set_menu_state(size) {
          localStorage.setItem("sub_menu_state", menuSize[size])
      }


      // Check current theme stored in loclae storage and apply
      if (showMenuState === null) {
          set_menu_state(1)
      }

      if (showMenuState === "enlarged") {
          saveclassName.classList.add("showMenu")
          }

      if (showMenuState === "minimized") {
          saveclassName.classList.remove("showMenu")
          }


      for (var i = 0; i < submenuLink.length; i++) {
          submenuLink[i].addEventListener("click", function() {
          this.parentElement.classList.toggle("showMenu");
  

          if (this.parentElement.classList.contains("showMenu")) {
              set_menu_state(0)
          }else{
              set_menu_state(1)
          }

          });
        };




    
    
    // create marker of currently used link
    const navLinks = document.querySelectorAll(".used_link");
    navLinks.forEach((navLink) => {
        navLink.addEventListener("click", () => {
        document.querySelector(".active-link")?.classList.remove("active-link"); /* ? checks if active link doesnt exist do nothing - if exist remove*/
        navLink.classList.add("active-link");
        });
    });


    

    // Open or close sidebar and change icon
    let btn = document.querySelector("#btn");
    let sidebar = document.querySelector(".sidebar");
    const barStates = ["open", "close"]

    let sidebarState = localStorage.getItem("state");
    
    function set_bar_state(state) {
        localStorage.setItem("state", barStates[state])
    }

    // Check current theme stored in loclae storage and apply
    if (sidebarState === null) {
        set_bar_state(0)
        btn.classList.remove("bx-menu")
        btn.classList.remove("bx-menu-alt-right")
        btn.classList.add("bx-menu")
        sidebar.classList.remove(barStates[1]);
    }

    if (sidebarState === "open") {
        btn.classList.remove("bx-menu")
        btn.classList.remove("bx-menu-alt-right")
        btn.classList.add("bx-menu")
        sidebar.classList.remove(barStates[1]);
    }

    if (sidebarState === "close") {
        btn.classList.remove("bx-menu")
        btn.classList.remove("bx-menu-alt-right")
        btn.classList.add("bx-menu-alt-right")
        sidebar.classList.add(barStates[1]);
    }



    btn.onclick = function () {
        sidebar.classList.toggle("close");
        BtnIconChange();
        };

    function BtnIconChange() {
        if (sidebar.classList.contains("close")) {
            btn.classList.replace("bx-menu", "bx-menu-alt-right");
            //localStorage.setItem("state", "close")
            set_bar_state(1)
        } else {
            btn.classList.replace("bx-menu-alt-right", "bx-menu");
            //localStorage.setItem("state", "open")
            set_bar_state(0)
        }
    }
