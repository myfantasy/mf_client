var globalLog = [];

function writeLog(type,sender, section, text, data) {
    var record = {type: type, sender: sender, section: section, text: text, data: data};
    globalLog.push(record);
    return record;
}

function writeError(sender, section, data, additionalText){
    var record = {type: "error", sender: sender, section: section, text: additionalText, data: data};
    globalLog.push(record);
    return record;
}

function showError(sender, section, text, data) {
    var record = writeLog("error", sender, section, text, data);
    Materialize.toast(text, 15000, 'errortoast');
    return record;
}

function showGoodMessage(sender, section, text, data) {
    var record = writeLog("Success", sender, section, text, data);
    Materialize.toast(text, 5000, 'successtoast');
    return record;
}
