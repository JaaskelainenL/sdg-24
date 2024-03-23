'use client';

import { uploadReport } from '@/app/lib/actions';

import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import "@/app/login/login.css";

export default function UploadForm() {
  const [errorMessage, dispatch] = useFormState(uploadReport, undefined);

  return (
    <div>
    <form action={dispatch} className="">
      <div className="">
        <h1 className={` mb-3 text-2xl`}>
          Create new report
        </h1>
        <div className="w-full">
          <div>
            <div className="">
              <textarea
                className=""
                id="msg"
                rows={10}
                maxLength={2000}
                name="msg"
                placeholder="Content"
                required
              />
              <div className="" />
            </div>
          </div>
        </div>
        <UploadButton />
      </div>
    </form>
    </div>
  );
}

function UploadButton() {
  return (
    <Button className="mt-4 w-full">
      Upload report <div className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
