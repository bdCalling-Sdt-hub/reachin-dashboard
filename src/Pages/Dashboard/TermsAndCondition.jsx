import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Title from '../../components/common/Title';
import { useCreateTermsMutation, useGetTermsQuery } from '../../redux/apiSlices/ruleSlice';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';


const TermsAndCondition = () => {
  const editor = useRef(null)
  const [content, setContent] = useState('');
  const [createTerms, {isLoading}] = useCreateTermsMutation();
  const { data:terms, refetch } = useGetTermsQuery();


  const aboutDataSave = async () => {

    try {
      await createTerms({content}).unwrap().then(({success, message}) => {
        if (success === true) {
          toast.success(message);
          refetch()
        }

      })
    } catch ({ message }) {
      toast.error(message || "Something Wrong");
    }
  }


  useEffect(() => {
    setContent(terms?.content);
  }, [terms])


  return (
    <div >
      <Title className="mb-4">Terms and Condition</Title>
      <JoditEditor
        ref={editor}
        value={content}
        
        onChange={newContent => { setContent(newContent) }}
      />

      <div className='flex items-center justify-center mt-5'>
        <button type="button" onClick={aboutDataSave}  className="bg-primary text-white w-[160px] h-[42px] rounded-lg">
          {isLoading ? <Spinner/> : "Submit"}
        </button>

      </div>

    </div>
  );
};

export default TermsAndCondition;



























