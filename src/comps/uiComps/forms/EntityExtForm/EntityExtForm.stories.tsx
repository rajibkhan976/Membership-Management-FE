import { ComponentStory, ComponentMeta } from '@storybook/react'
import EntityExtForm from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/EntityExtForm',
  component: EntityExtForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EntityExtForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EntityExtForm> = (args) => <EntityExtForm {...args} />

export const BasicEntity = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicEntity.args = {}

// const API_RESPONSE = [
//   {
//     ExId: 4,
//     ItemId: 14588,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_TextField',
//     Config: '{"label":"Short anser"}',
//     FieldId: 12426,
//     Sequence: 1,
//     SyncGuid: '4B29AA83-3835-4103-95CA-B3E53DF85034',
//     $index: 0,
//   },
//   {
//     ExId: 4,
//     ItemId: 14587,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_TextArea',
//     Config: '{"label":"paragraph"}',
//     FieldId: 12427,
//     Sequence: 2,
//     SyncGuid: 'DD039BBA-20F0-438C-A722-5E91271B40A4',
//     $index: 1,
//   },
//   {
//     ExId: 4,
//     ItemId: 14586,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_NumberField',
//     Config: '{"label":"Number"}',
//     FieldId: 12428,
//     Sequence: 3,
//     SyncGuid: '286B120D-3073-495A-9953-610E053E0F00',
//     $index: 2,
//   },
//   {
//     ExId: 4,
//     ItemId: 14585,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_CheckboxGroup',
//     Config: '{"label":"Checkbox group","type":"checkbox"}',
//     FieldId: 12429,
//     Sequence: 4,
//     SyncGuid: '80E7527D-D3A8-4FD7-B292-4F7C95830E38',
//     $index: 3,
//   },
//   {
//     ExId: 4,
//     ItemId: 14584,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_CheckboxGroup',
//     Config: '{"label":"Multiple choice","type":"radio"}',
//     FieldId: 12430,
//     Sequence: 5,
//     SyncGuid: '2F965839-391D-415E-8D12-C1766D5DA6D4',
//     $index: 4,
//   },
//   {
//     ExId: 4,
//     ItemId: 14583,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_ListField',
//     Config: '{"label":"Dropdown"}',
//     FieldId: 12431,
//     Sequence: 6,
//     SyncGuid: '1D6AE8A3-6401-4A4D-AC42-1B103871EBD1',
//     $index: 5,
//   },
//   {
//     ExId: 4,
//     ItemId: 14582,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_DateField',
//     Config: '{"label":"Date"}',
//     FieldId: 12432,
//     Sequence: 7,
//     SyncGuid: '9CAD8662-95E1-4571-8673-F004F413A838',
//     $index: 6,
//   },
//   {
//     ExId: 4,
//     ItemId: 14581,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_Checkbox',
//     Config: '{"label":"Checkbox"}',
//     FieldId: 12433,
//     Sequence: 8,
//     SyncGuid: '61E62702-70A5-4520-A833-37DBA156B444',
//     $index: 7,
//   },
//   {
//     ExId: 4,
//     ItemId: 14580,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_ListField',
//     Config:
//       '{"fieldSize":"small","data":[{"name":"yes","value":1,"cap":"Yes"},{"name":"no","value":0,"cap":"No"}],"displayField":"cap","valueField":"value","label":"Yes no"}',
//     FieldId: 12434,
//     Sequence: 9,
//     SyncGuid: '1014D5C1-0239-4421-AB4B-11370E36C7CC',
//     $index: 8,
//   },
//   {
//     ExId: 4,
//     ItemId: 14579,
//     ParentId: 14578,
//     Name: null,
//     Class: 'MA_ListField',
//     Config:
//       '{"fieldSize":"small","data":[{"name":"Yes","value":"Yes","cap":"Yes"},{"name":"No","value":"No","cap":"No"}],"displayField":"cap","valueField":"value","isNonBooleanYN":true,"label":"Yes - no non boolean"}',
//     FieldId: 12435,
//     Sequence: 10,
//     SyncGuid: '9FADE44A-514E-4BC0-B9E6-61122A8E2730',
//     $index: 9,
//   },
// ]
