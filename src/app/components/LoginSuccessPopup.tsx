'use client'


type Props = {
  site_id: string;
  user_id: string;
};

export default function LoginSuccessPopup({site_id, user_id }: Props) {
   
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
     
        <h2 className="text-xl font-semibold mb-4 text-green-600">Login Successful!</h2>
        <p className="mb-2 text-sm text-gray-600">Here’s your tracking script:</p>
        <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-x-auto">
        <pre className="bg-gray-100 p-4 rounded-md">
             &lt;script
             src="https://proofly.com/tracker.js"
             data-site-id={site_id}
            data-user-id={user_id}&gt;&lt;/script&gt;
        </pre>

        </pre>
      </div>
    </div>
  );
}
