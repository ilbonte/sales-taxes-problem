# sales-taxes-problem (stp)

## Prerequisites

`Node.js v6.x.x`

`npm v2.x.x` or newer

## Usage

1. clone or download this repository
2. run `npm install` inside the downloaded folder to install the dependencies
3. run `node stp -p <path to input file or folder>`

```txt
Usage:
 node stp  -p <path> [opts]

Options:
    -p, --path <path>  (REQUIRED) Calculate the price for the given file(s) and print receipt to file
    -d, --display      Print the receipt to screen
    -h, --help         Output usage information

```
**Note**: The receipt is printed in a file with the same name as the input file, but in the folder named "output" (located in the same directory of the input file).

```txt
Examples:
# print the receipt to file and display the result for all the files in 'test\examples'
node stp -p test\examples -d

# print the receipt to file for the file 'test/examples/example1.txt'
node stp -p test\examples\example1.txt
```

### To run the files provided as examples, run `node stp -p test/examples -d`

### Input file
Every line of the input file coincide with a product.

Prduct/line's syntax **must be**:
```txt
quantity ["imported"] [container "of"] name "at" price
```
1. `quantity` must be a positive integer
2. `imported` is the keyword for imported products. Can be placed in any position between `quantity` and "at"
3. `container "of"` is the product's container e.g: `box of <name>` `bottle of <name>`. Is ignored during price's calculation
3. `name` is any string of char
4. `at` is a keyword and must be before `price`
5. `price` must be a positive float with 2 decimal

### Configuration

To add categories or exclude products from the goods sales tax you must edit the file `categories.json` placed in the `src` folder, adding the name of the product you want to exclude.

### Test
Run tests with `npm test`
