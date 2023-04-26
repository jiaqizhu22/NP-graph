function trimSpace(str) {
    if (str === "") {
        return [];
    }
    var temp_words = str.toLowerCase().replace(/\s*,\s*/g, ",").split(",");
    var res_words = temp_words.map( w => w.trim());
    return res_words;
};

function strMatchSubstr(str, substrings) {
    let matches = 0;
    for (let i = 0; i < substrings.length; i++) {
        if (str.includes(substrings[i])) {
            console.log(`${str} contains ${substrings[i]}`);
            matches += 1;
        }
    }
    console.log(matches);
    console.log(matches > 0 ? true : false);
    return matches > 0 ? true : false;
};

function listStrMatchSubstr(strings, substrings) {
    let matches = 0;
    for (let i = 0; i < substrings.length; i++) {
        for (let j = 0; j < strings.length; j++) {
            if (strings[j].toLowerCase().includes(substrings[i])) {
                console.log(`${strings[j]} contains ${substrings[i]}`);
                matches += 1;
            }
        }
    }
    console.log(matches);
    console.log(matches > 0 ? true : false);
    return matches > 0 ? true : false;
};

export {trimSpace, strMatchSubstr, listStrMatchSubstr};