const React = require('react');
const {useState, useRef} = React;


const WordRelay = () => {
  const [word, setWord] = useState('우진');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setResult('good');
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('Wrong!!');
      setValue('');
      inputRef.current.focus();

    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor='wordInput'>글자를 입력하세요</label>
        <input id='wordInput' className='wordInput' ref={inputRef} value={value} onChange={onChangeInput}></input>
        <button>GO</button>
      </form>
      <div>{result}</div>
    </>
    )
}


module.exports = WordRelay;