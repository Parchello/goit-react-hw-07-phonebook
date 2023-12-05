import { useDispatch, useSelector } from 'react-redux';
import { FilterInput } from './Filter.styled';
import { onChangeName } from 'Redux/filterSlice';

export const Filter = () => {
  const element = useSelector(state => state.filter);
  const dispatch = useDispatch();
  return (
    <div>
      <FilterInput
        type="text"
        value={element.name}
        placeholder="Find contact"
        onChange={evt => dispatch(onChangeName(evt.target.value))}
      />
    </div>
  );
};
