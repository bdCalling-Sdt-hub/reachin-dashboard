import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Title from '../../components/common/Title';
import Spinner from '../../components/common/Spinner';
import { useCreatePrivacyMutation, useGetPrivacyQuery } from '../../redux/apiSlices/ruleSlice';

const PrivacyPolicy = () => {
  const editor = useRef(null)
  const [content, setContent] = useState('');
  const [createPrivacy, { isLoading }] = useCreatePrivacyMutation();
  const { data: privacy, refetch } = useGetPrivacyQuery();

  const aboutDataSave = async () => {

    try {
      await createPrivacy({ content }).unwrap().then(({ success, message }) => {
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
    setContent(privacy?.content);
  }, [privacy])



  return (
    <div >
      <Title className="mb-4">License Terms & Conditions</Title>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent => { setContent(newContent) }}
      />

      <div className='flex items-center justify-center mt-5'>
        <button onClick={aboutDataSave} type="button" className="bg-primary text-white w-[160px] flex items-center justify-center h-[42px] rounded-lg">
          { isLoading ? <Spinner/> : "Submit" }
        </button>

      </div>

    </div>
  );
};

export default PrivacyPolicy;
