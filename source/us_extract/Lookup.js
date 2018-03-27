class Lookup {
	constructor(text) {
		this.result = {
			meta: {},
			addresses: [],
		};
		//TODO: require the text field.
		this.text = text;
		this.html = undefined;
		this.aggressive = undefined;
		this.addressesHaveLineBreaks = undefined;
		this.addressesPerLine = undefined;
	}
}

module.exports = Lookup;