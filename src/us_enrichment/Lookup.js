class Lookup {
    constructor(smartyKey, include, exclude, dataset, dataSubset) {
        this.smartyKey = smartyKey;
        this.include = include;
        this.exclude = exclude;
        this.dataset = dataset;
        this.dataSubset = dataSubset;

        this.response = {};
        this.customParameters = {};
    };

    addCustomParameter(key, value) {
		this.customParameters[key] = value;
	}
}

module.exports = Lookup;