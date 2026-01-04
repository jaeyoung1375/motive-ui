import { SelectOption, SelectProps } from '~types/Common';

export default function Select({
  text,
  list,
  ...props
}: SelectProps<SelectOption>) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{text}</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...props}
      >
        {list?.map((item) => {
          return (
            <option key={item.codeId} value={item.codeName}>
              {item.codeName}
            </option>
          );
        })}
      </select>
    </div>
  );
}
