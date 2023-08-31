function splitPreservingSpecial(inputString:string) {
    const placeholder = '###PLACEHOLDER###';

    // Replace the '\n' +' expression with a placeholder
    const stringWithPlaceholder = inputString.replace(/\n' \+/g, placeholder);
  
    // Split the string using the placeholder
    const charArray = stringWithPlaceholder.split('');
  
    // Replace the placeholder back with '\n' +
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i] === '#' && charArray[i + 1] === '#' && charArray[i + 2] === '#' && charArray[i + 3] === 'P') {
        charArray.splice(i, 4, "\n'", ' ', '+');
        i += 2; // Skip the replaced characters
      }
    }
  
    return charArray;
  }


export default splitPreservingSpecial;