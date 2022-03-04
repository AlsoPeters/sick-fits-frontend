function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

describe('Same test 101', () => {
  it('works as expected', () => {
    // we run our expect statements to see if the test will pass
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  it('Runs the add function properly', () => {
    expect(add(1, 3)).toBeGreaterThanOrEqual(3);
  });
  it('Can add strings of numbers together', () => {
    expect(add('1', '2')).toBe(3);
  });
});
