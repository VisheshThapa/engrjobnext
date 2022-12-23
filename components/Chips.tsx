import { Chip } from '@mantine/core';


export default function Chips(){
    <Chip.Group position="center" multiple mt={15}>
        <Chip value="1">Multiple chips</Chip>
        <Chip value="2">Can be selected</Chip>
        <Chip value="3">At a time</Chip>
      </Chip.Group>
}

