# ICMP Protocol

Component: type(8 bits), code(8 bits), checksum(16 bits), refer to the doc of the type(32 bits), data.

## Checksum Calculation

Take each 16 bits as a unsigned number and sometimes need to pad the remaining bits with zero.

Then the complement of the their sum is the final checksum.

By the way, the checksum must be clear to zero before the calculation.
