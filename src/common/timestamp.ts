import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";


export class TimeStampInfo {
    
    @CreateDateColumn()
    createdAt;
    
    @UpdateDateColumn()
    updatedAt;
    
    @DeleteDateColumn()
    deletedAt;
}