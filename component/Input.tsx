import { InputProps } from "@type/Common";

export default function Input({ text, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{text}</label>
      <input
        type="text"
        id="id"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </div>
  );
}
