import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { TransactionsContext } from '../../TransactionsContext';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, RadioBox, TransactionTypeContainer, } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionsContext);

    const [title, setTitle] = useState(``);
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState(``);


    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            categories,
            type,
        })

        setTitle('');
        setAmount(0);
        setCategories('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input
                    placeholder="Título"
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    placeholder="Valor"
                    type="number"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    type="text"
                    value={categories}
                    onChange={event => setCategories(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}
