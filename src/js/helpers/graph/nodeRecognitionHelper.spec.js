import {
  hasTransitions, isComposite, hasProcessedTransitions, hasPreDefinedTransitions,
} from './nodeRecognitionHelper';

test('Node transision existance is correctly identified', () => {
  expect(hasTransitions({})).toBeFalse();
  expect(hasTransitions({ on: {} })).toBeFalse();
  expect(hasTransitions({ on: { _success: {} } })).toBeTrue();
});

test('Node processed transition existance is correctly identified', () => {
  expect(hasProcessedTransitions({})).toBeFalse();
  expect(hasProcessedTransitions({ on: {} })).toBeFalse();
  expect(hasProcessedTransitions({ on: { _success: { status: 'UNPROCESSED' } } })).toBeFalse();
  expect(hasProcessedTransitions({ on: { _success: { status: 'SUCCESS' } } })).toBeTrue();
});

test('Node predefined transition existance is correctly identified', () => {
  expect(hasPreDefinedTransitions({})).toBeFalse();
  expect(hasPreDefinedTransitions({ on: {} })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { custom: {} } })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { _success: {} } })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { _error: {} } })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { _success: {}, _error: {} } })).toBeTrue();
});

test('Composites are correctly identified', () => {
  const lowercaseComposite = { type: 'composite' };
  const uppercaseComposite = { type: 'COMPOSITE' };
  const lowercaseSingle = { type: 'single' };
  const uppercaseSingle = { type: 'SINGLE' };

  expect(isComposite(lowercaseComposite)).toBeTrue();
  expect(isComposite(uppercaseComposite)).toBeTrue();
  expect(isComposite(lowercaseSingle)).toBeFalse();
  expect(isComposite(uppercaseSingle)).toBeFalse();
});
