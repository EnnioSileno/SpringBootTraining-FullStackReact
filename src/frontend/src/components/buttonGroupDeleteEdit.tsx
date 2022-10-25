import { Radio } from 'antd';


const ButtonGroupDeleteEdit: React.FC = (): JSX.Element => {
    return (
        <Radio.Group onChange={(e) => console.log(e + ' was pressed')}>
            <Radio.Button onClick={() => console.log('Delete student clicked')}>Delete</Radio.Button>
            <Radio.Button onClick={() => console.log('Edit student clicked')}>Edit</Radio.Button>
        </Radio.Group>
    );
}

export default ButtonGroupDeleteEdit;