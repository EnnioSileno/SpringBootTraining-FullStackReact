import { Radio } from 'antd';
import { IStudent } from '../interfaces';

type Props = {
    handleDelete: () => void
    handleEdit: () => void
}

const ButtonGroupDeleteEdit: React.FC<Props> = ({ handleDelete, handleEdit }): JSX.Element => {
    return (
        <Radio.Group>
            <Radio.Button onClick={handleDelete}>Delete</Radio.Button>
            <Radio.Button onClick={handleEdit}>Edit</Radio.Button>
        </Radio.Group>
    );
}

export default ButtonGroupDeleteEdit;