
import props from './props.js';


const Index = {

  _defaultComponentSetup(){    
    this._loadAvailableFonts();
    this._loadLibraryDefaultFonts();
  },

  _getDefaultFonts(){
    const startToAddFonts = props._root.$id.libraryFontslist.children.length;
    let fonts7 = 6;
    const fetchFonts = [];
    props._fonts.forEach((f,i)=>{
      if(fonts7 === 0) return false;      
      if(i >= startToAddFonts) {
        fetchFonts.push(props._fonts[i]);
        fonts7--;
      }
    })
    return fetchFonts;
  },

  _loadLibraryDefaultFonts() {
      const fontsData = this._getLibraryFontFetchUrlTemplate(this._getDefaultFonts());
      this._setupFontsLinkHTML(fontsData);
  },

  _getAvailableFontFetchUrlTemplate(fonts=[]){
    if(fonts.length == 0) return fonts;

    let fontTemplate = this._getFontListingTemplate();
    let fontsList = '';
    let fontLinkHref = 'https://fonts.googleapis.com/css2?';
    fonts.forEach((f,i)=>{
      const fontFamily = `'${fonts[i]}', sans-serif`;
      fontLinkHref += `&family=${fonts[i].replaceAll(' ','+')}:wght@100;200;300;400;500;600;700;800;900`;        
      fontsList += fontTemplate.replaceAll('@@font-family-style@@', fontFamily)
      .replaceAll('@@font-family-name@@', fonts[i])
      .replaceAll('@@font-button-action@@', 'delete')
      .replaceAll('@@font-button-action-svg@@', 'minus');
    })
    fontLinkHref = fontLinkHref.replace('&','');
    fontLinkHref += '&display=swap';
    return {href: fontLinkHref, html: fontsList};
  },

  _getLibraryFontFetchUrlTemplate(fonts=[]){
    if(fonts.length == 0) return fonts;

    let fontTemplate = this._getFontListingTemplate();
    let fontsList = '';
    let fontLinkHref = 'https://fonts.googleapis.com/css2?';
    fonts.forEach((f,i)=>{
      const fontFamily = `'${fonts[i]}', sans-serif`;
      fontLinkHref += `&family=${fonts[i].replaceAll(' ','+')}:wght@100;200;300;400;500;600;700;800;900`;        
      fontsList += fontTemplate.replaceAll('@@font-family-style@@', fontFamily)
      .replaceAll('@@font-family-name@@', fonts[i])
      .replaceAll('@@font-button-action@@', 'add')
      .replaceAll('@@font-button-action-svg@@', 'plus');
    })
    fontLinkHref = fontLinkHref.replace('&','');
    fontLinkHref += '&display=swap';
    return {href: fontLinkHref, html: fontsList};
  },

  _loadAvailableFonts(){    
    const fontFamilies = (Object.keys(WBTR.data.options['font-family'])).sort();    
    if(!fontFamilies.length) return;
    
    const fontsData = this._getAvailableFontFetchUrlTemplate(fontFamilies);
    fontsData.alter = 'replace';
    fontsData.target = 'availableFontslist';
    this._setupFontsLinkHTML(fontsData);          
  },

  _getFontListingTemplate(){
    const template = `
      <li class="fontlist-item" data-font-family-name="@@font-family-name@@">
        <h4 class="fontlist-title">@@font-family-name@@ <button part="font-btn" class="font-btn @@font-button-action@@-font" data-event-id="@@font-button-action@@-font">@@font-button-action@@ <svg part="font-btn-svg" class="@@font-button-action-svg@@-icon" xmlns="http://www.w3.org/2000/svg"><use href="assets/images/svg-icons.svg#@@font-button-action-svg@@-symbol"></use></svg></button> </h4>
        <p class="fontlist-uppercase" contenteditable="true" spellcheck="false" style="font-family: @@font-family-style@@;">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p class="fontlist-lowercase" contenteditable="true" spellcheck="false" style="font-family: @@font-family-style@@;">abcdefghijklmnopqrstuvwxyz</p>
        <p class="fontlist-numbers" contenteditable="true" spellcheck="false" style="font-family: @@font-family-style@@;">013456789</p>              
      </li>
    `;
    return template;
  },

  _modalClean(){
    const linkEls = document.head.querySelectorAll('[data-load-fonts]');
    linkEls.forEach((lEl)=>{
      lEl.remove();
    })
    props._root.shadowRoot.querySelectorAll('.fontlist-item').forEach((el)=>{
      el.remove();
    })
    props._root.$id.libraryFontslist.replaceChildren();
    props._root.$id.availableFontslist.replaceChildren();
  }, 
 
  _setupFontsLinkHTML(args){
    const fontLink = document.createElement("link");
    fontLink.type = "text/css";
    fontLink.setAttribute('data-load-fonts', true);
    fontLink.rel = "stylesheet";      
    fontLink.href = args.href;
    document.head.appendChild(fontLink);

    args.target = args.target || 'libraryFontslist';
    args.alter = args.alter || 'append';
    
    if(args.alter == 'replace') props._root.$id[args.target].innerHTML = args.html;
    if(args.alter == 'append') props._root.$id[args.target].insertAdjacentHTML('beforeend', args.html);
  },

  async getFontsData(fontsObj) {
    const fonts = Object.keys(fontsObj);
    const fontWeights = {};
    fonts.forEach((f)=>{
        fontWeights[f] = new Set();
    })

    const weights = "0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900";
    const fontParams = fonts.map(font => `family=${encodeURIComponent(font)}:ital,wght@${weights}`).join("&");            
    const fontsURL = `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;

    try {
        const response = await fetch(fontsURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }           

        const cssText = await response.text();
        const regex = /font-family:\s*['"]?(.*?)['"]?;.*?font-style:\s*(\w+);.*?font-weight:\s*(\d+)/gs;
        const results = [];
        let match;
        while ((match = regex.exec(cssText)) !== null) {
            results.push({
                fontFamily: match[1],
                fontWeight: match[3],
                italic: match[2] === "italic"
            });
        }

        results.forEach((fw)=>{

            let fWeight = '';
            if(fw.fontWeight == 100) fWeight = '100-Thin';
            if(fw.fontWeight == 200) fWeight = '200-ExtraLight';
            if(fw.fontWeight == 300) fWeight = '300-Light';
            if(fw.fontWeight == 400) fWeight = '400-Regular';
            if(fw.fontWeight == 500) fWeight = '500-Medium';
            if(fw.fontWeight == 600) fWeight = '600-SemiBold';
            if(fw.fontWeight == 700) fWeight = '700-Bold';
            if(fw.fontWeight == 800) fWeight = '800-ExtraBold';
            if(fw.fontWeight == 900) fWeight = '900-Black';

            if(fw.italic) {                
                fontWeights[fw.fontFamily].add(fWeight + '-italic');
            } else {
                fontWeights[fw.fontFamily].add(fWeight);
            }
            
        })     
        return {fontsURL, fontWeights};

    } catch (error) {
        console.error("Error fetching data:", error);
    }          
  },

  _modalShow(){    
    this._defaultComponentSetup();
  },

  _modalHide(){
    this._modalClean();
    WBTR.designSidebarDesigns._methods._updateAvailableFonts();
  },

}

export default Index;