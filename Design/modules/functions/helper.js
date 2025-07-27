
class WBTR_Help {
	static underScoreToCamelCase(underScoreString){
		if(!underScoreString.includes('-')) return underScoreString;

		let word = '';
		underScoreString.split('-').forEach((w,i)=>{
			if(i===0) {
				word += w;
			} else {
				word += w.charAt(0).toUpperCase()+w.slice(1);
			}				
		})
		return word;
	}

	static firstCharacterUppercase(str){
		return str.charAt(0).toUpperCase()+str.slice(1);
	}

	static encodeHTMLToBase64(str) {
		return btoa(unescape(encodeURIComponent(str)));
	}

	static decodeHTMLFromBase64(base64) {
		return decodeURIComponent(escape(atob(base64)));
	}


	
}

export default WBTR_Help;