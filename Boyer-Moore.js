function strings_compare(s1, s2){
    for (let i = 0; i < s1.length; i++)
        if (s1[i] != s2[i] && s1[i] != '*')
            return false;
    return true;
}

let s = process.argv[2];
let t = process.argv[3];

let m = t.length;
positions = new Array();


// первая эвристика
let N = [];
for (let j = 0; j < m; j++){
    N[t.charAt(j)] = j + 1;
}
let shift1 = 0; 


// вторая эвристика
let tt = t.padStart(m, '*'); 
let rpr = []; 
let shift2 = []; 
for (let l = 0; l < m; l++){
    let k = m - l;
    let flag = true;
    while(flag){
        let a = tt.substring(m + k - 1, m + k + l - 1);
        let b = t.substring(m - l, m);
        if (strings_compare(a, b) && (k <= 1 || k > 1 && t[k - 2] != t[m - l - 1]))
            flag = false;
        k--;
    }
    rpr[l] = k + 1;
    shift2[l] = m - rpr[l] - l + 1;
}


index = m - 1;
while (index < s.length){
    let shift = 1;
    if (s[index] == t[m - 1]){
        let flag = true;
        for (let j = 1; j < m; j++)
            if (s[index - j] != t[m - 1 - j]){
                flag = false;
                if (N[s[index - j]] == undefined)
                    shift = m - j;
                else{
                    shift1 = Math.max(m - N[s[index - j]]- j, 1);
                    shift = Math.max(shift1, shift2[j]);
                }
                break;
            }
        if (flag){
            positions.push(index - m + 1);
            shift = 1;
        }
    } else if (N[s[index]] == undefined){
        shift = m;
    } else {
        shift1 = Math.max(m - N[s[index]], 1);
        shift = Math.max(shift1, shift2[0]);
    }
    index += shift;
}

console.log(positions);
