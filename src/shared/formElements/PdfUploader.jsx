import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { MdOutlineUploadFile } from 'react-icons/md';
import { FaFileCircleCheck } from 'react-icons/fa6';
import { toTitleCase } from '../util/generalFunc';

const PdfUploader = ({
  addDocument,
}) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState('');

  // Handle file selection
  const handleFileChange = useCallback((e) => setFile(e.target.files[0]), []);
  // handle file removal
  const removeFile = useCallback((e) => {
    e.preventDefault();
    setFile(null);
    document.getElementById("input_file").value = null;
    setMessage('');
    setIsDisabled(false);
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      window.alert(" No file selected.");
      return;
    }

    const labelName = window.prompt("Name of the document (required): ");
    if (labelName === null) {
      window.alert("File name is required.");
      return;
    }

    // eslint-disable-next-line no-alert
    const userConfirmed = window.confirm("Are you sure want to Submit this document?");
    if (!userConfirmed) {
      removeFile();
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`File uploaded successfully: ${response.data.filename.split("-")[1]}`);
      setIsDisabled(true);
      addDocument({ fileTitle: toTitleCase(labelName), fileName: response.data.filename.split("-")[1], fileId: response.data.fileId });
    } catch (error) {
      setMessage('Error uploading file');
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-0 mt-2">
        <p className='text-md text-gray-600 font-circular'>{`Click to upload:`}</p>
        <div className="max-w-[300px] flex flex-row gap-4 items-center">
          {
            !file ? (
              <div className='flex flex-col gap-2 mb-4'>
                <MdOutlineUploadFile onClick={() => {
                  if (!file) {
                    alert(" Please select a file first. ");
                  }
                }}
                  className=' cursor-pointer text-6xl text-blue-700 ' />

              </div>
            ) : (
              <div>
                <FaFileCircleCheck className='cursor-not-allowed text-6xl text-blue-400 ml-4 mt-2' />

              </div>
            )
          }
          <form className="mt-4 w-4/5 flex flex-col gap-2 " onSubmit={handleUpload}>
            {message && <p className="text-md text-gray-500 font-light">{message}</p>}
            <input
              id="input_file"
              type="file"
              className="text-sm"
              onChange={handleFileChange}
              disabled={file}
              accept="application/pdf"
              hidden={isDisabled}
            />
            <button
              type="submit"
              hidden={isDisabled}
              className="py-1 px-2 bg-gray-300 text-md rounded-xl mt-2"
            >
              Upload
            </button>
            { }
            {!file &&
              <p
                className="italic text-sm text-gray-500 mt-1 font-extralight">
                Can upload only one file at once.
              </p>
            }
            {<button
              hidden={!isDisabled}
              onClick={removeFile}
              className="py-1 px-2 bg-gray-300 text-md rounded-xl mt-2">
              Add More Documents
            </button>
            }
          </form>
        </div>
      </div>
    </>
  );
};

export default PdfUploader;
