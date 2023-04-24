function trimSpace(str) {
    var temp_words = str.toLowerCase().replace(/\s*,\s*/g, ",").split(",");
    var res_words = temp_words.map( w => w.trim());
    return res_words;
};

export {trimSpace};