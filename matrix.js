//https://en.wikipedia.org/wiki/Matrix_addition
//https://en.wikipedia.org/wiki/Matrix_multiplication

function m_sum(m1, m2) { //takes as inputs two matrixes and sums them
    let output = [];

    //make the two matrixes have the same amount of rows
    if (m1.length > m2.length) { //if the matrix n.1 has more rows than the matrix n.2, then add as many rows as needed to the matrix n.2, to make the length of the m2 the same of the m1
        //start from the length of the smaller matrix, then add a row till i equals the length of the bigger matrix
        for (let i = m2.length; i < m1.length; i++) {
            //the row must have the same length of the other rows in the matrix 2, so add as many 0s as there are numbers that the first row of m2 has
            let row = [];
            for (let j = 0; j < m2[0].length; j++) {
                row.push(0);
            }
            //add the row to the end of the matrix n.2
            m2.push(row);
        }
    } else if (m2.length > m1.length) { //again. if the matrix n.2 has more rows than the matrix n.1, then add as many rows as needed to the matrix n.1, to make the length of the m1 the same of the m2
        //same principles as before
        for (let i = m1.length; i < m2.length; i++) {
            let row = [];
            for (let j = 0; j < m1[0].length; j++) {
                row.push(0);
            }
            m1.push(row);
        }
    }

    //sum each individual element from the matixes
    for (let i = 0; i < m1.length; i++) {
        let row = [];
        for (let j = 0; j < (m1[0].length > m2[0].length ? m1[0].length : m2[0].length); j++) { //loop through every element in the matrixes and sum the corrisponding one
            //"||0" after the numbers changes NaN elements to 0, withouth damaging the output (e.g. (12 || 0) + (NaN + 0) = 12, and not NaN)
            row.push((m1[i][j] || 0) + (m2[i][j] || 0));
        }
        output.push(row);
    }

    return output;
}

function m_sub(m1, m2) { //takes as inputs two matrixes and subtracts the second matrix from the first one
    //change the sign from every element of the second matrix, then sum the arrays (m1 - m2 = m1 + (-m2))
    for (let i = 0; i < m2.length; i++) {
        for (let j = 0; j < m2[i].length; j++) {
            m2[i][j] *= -1;
        }
    }

    return m_sum(m1, m2);
}

function m_dsum(m1, m2) { //direct sum operation 
    let output = [];

    //first add the matrix n.1, using as many rows as the m1 has and as many columns as the sum of the columns of the two matrixes, to let all the numbers fit in the output matrix
    for (let i = 0; i < m1.length; i++) {
        let row = [];
        for (let j = 0; j < m1[0].length + m2[0].length; j++) {
            row.push(m1[i][j] || 0);
        }
        output.push(row);
    }

    for (let i = 0; i < m2.length; i++) {
        let row = [];
        //on the second matrix rows, start by adding 0s to the columns used by the matrix n.1
        for (let j = 0; j < m1[0].length; j++) {
            row.push(0);
        }

        //after adding the 0s, add the matrix n.2 numbers
        for (let j = 0; j < m2[0].length; j++) {
            row.push(m2[i][j]);
        }

        output.push(row);
    }

    return output;
}

function m_mult(m1, m2) { //takes as inputs two matrixes and multiplies them
    let output = [];

    if (m1[0].length != m2.length) { //when two matrixes get multiplied, if the columns of m1 aren't as much as the rows of m2, the multiplication can't be done
        return NaN;
    }

    //do for every row of m1, bla m1[row] to m2[column] for m2 columns
    for (let i = 0; i < m1.length; i++) { //repeat for every row that's in the matrix n.1
        let row = [];
        for (let j = 0; j < m2[0].length; j++) { //repeat for every column that's in the matrix n.2
            let sum = 0;
            for (let k = 0; k < m2.length; k++) { //repeat for every m1 column (which is the same as saying repeat for every m2 row)
                //add to the current sum the product of the currently analized elements
                sum += m1[i][k] * m2[k][j];
            }
            //add the sum to the row
            row.push(sum);
        }
        //add the row to the output
        output.push(row);
    }

    return output;
}
