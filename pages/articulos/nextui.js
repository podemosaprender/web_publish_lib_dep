import {Button} from '@nextui-org/button'; 
import NavBar from '../../components/navbar';

export default function Page() {
	return (<>
		<NavBar />
    <div>
      <Button color="primary">Click me</Button>
    </div>
	</>)
}
