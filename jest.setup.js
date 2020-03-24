import Adapter from 'enzyme-adapter-react-16';
import { toBeVisible } from '@testing-library/jest-dom/matchers';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

expect.extend({ toBeVisible });
