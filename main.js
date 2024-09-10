const eligibleAdress = [
    
'0x0ea121894d5d4033cc945284df8cb4c48c841b3a',
'0x74792c9e98337cfdb6939120cce5f1cb9ac3cbff',
'0x6976359de88456a0673c3389881ce77d0f4a8bfd',
'0xfd84a0b8dfb591cb76a0df25b26c95c682cba4d9'


].map(x => CryptoJS.SHA256(x))

const tree = new MerkleTree(eligibleAdress, CryptoJS.SHA256)
const root = tree.getRoot().toString('hex')
const leaf = CryptoJS.SHA256('a')
const proof = tree.getProof(leaf)

function checkeligibleAdress(userAdress) {
const hashedAdd = CryptoJS.SHA256(userAdress).toString()
const proof = tree.getProof(hashedAdd);
const isValidate = tree.verify(proof, hashedAdd, root);
return isValidate;

}

document.getElementById('check-qualification').addEventListener('click', () => {
    const userAddress = document.getElementById('user-address').value;
    const resultDiv = document.getElementById('result');

    
    if ( checkeligibleAdress(userAddress)) {
      resultDiv.textContent = "Eligible for airdrop";
      resultDiv.style.color = 'green';
    } else {
      resultDiv.textContent = "Not eligible for airdrop";
      resultDiv.style.color = 'red';
    }
  });

  document.getElementById('clear-button').addEventListener('click', () => {
    const userAddressInput = document.getElementById('user-address');
    userAddressInput.value = ''; 
    document.getElementById('result').textContent = ''; 
  });


