//const courseCode = new RegExp('([A-Z]{3}[A-D]\\d{2}H3)|(\\[)|(\\])|(\\sand)|(\\sor)', 'g');
const courseCode = new RegExp('[A-Z]{3}[A-D]\\d{2}H3', 'g');

exports.matchCourses = (text) => {
    let ans = []
    while((val = courseCode.exec(text)) !== null) {
        ans.push(val[0]);
    }
    return ans;
}