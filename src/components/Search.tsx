import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useAppContext } from '@/context/AppContext';

export default function SearchComponent(): JSX.Element {
  const { setSearchValue, searchValue } = useAppContext();
  const router = useRouter();
  return (
    <form
      onSubmit={(e): void => {
        e.preventDefault();
      }}>
      <div className='form-element' title='Search'>
        <HiDotsHorizontal />
        <input
          type='text'
          placeholder='Type something...'
          value={searchValue}
          onChange={(e): void => {
            setSearchValue(e.target.value);
          }}
        />
      </div>

      <button
        onClick={(): void => {
          if (searchValue.length < 1) return;
          router.push(`/search?q=${searchValue}`);
        }}>
        <IoSearch />
        <span>Search</span>
      </button>
    </form>
  );
}
